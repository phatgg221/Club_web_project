import { useEffect, useState } from "react";
import React from "react";
import ChampionCard from "@/components/menuChamp/championCard";
import styles from "@/styles/Foldable.module.css";
import CreateChampion from "@/components/menuChamp/champForm";

function Champion() {
    const [teamList, setTeamList] = useState([]);
    const [championToUpdate, setChampionToUpdate] = useState(null);
    const [selectedItemIndex, setSelectedItemIndex] = useState(null);
    const [isUpdate, setIsUpdate] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('../../api/champion_api');
                const data = await response.json();

                // Transform the data into the desired format
                let formattedData = data.data.mongoData.map((item, index) => ({
                    id: item._id,
                    name: item.teamName || false,
                    competition: item.competitionDescription || false,
                    award: item.awardDes || false,
                    images: item.images || [],
                    available: item.teamName || false,
                    index,
                    teamOrder: item.teamOrder || index, // Add teamOrder to each item
                }));

                // Sort the formattedData array by teamOrder
                formattedData = formattedData.sort((a, b) => a.teamOrder - b.teamOrder);

                setTeamList(formattedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    const handleToggleFold = (index) => {
        setSelectedItemIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const handleAction = async (action, champion) => {
        switch (action) {
            case 'update':
                setChampionToUpdate(champion);
                setIsUpdate(true);
                break;
            case 'delete':
                try {
                    // Make a DELETE request to your API endpoint
                    const response = await fetch(`/api/champion_api?id=${champion.id}`, {
                        method: 'DELETE',
                    });

                    if (response.ok) {
                        // Handle success, maybe refresh the list or perform other actions
                        console.log(`Champion deleted successfully!`);
                        handleUpdateSuccess();
                    } else {
                        // Handle error, maybe show an error message
                        console.error('Failed to delete champion');
                    }
                } catch (error) {
                    console.error('Error deleting champion:', error);
                }
                break;
            case 'new':
                setIsUpdate(false);
                break;
            default:
                break;
        }
    };

    const handleUpdateSuccess = () => {
        window.location.reload();
    };



    return (
        <div>
            <ChampionCard></ChampionCard>

            {[...Array(5)].map((_, index) => {
                const team = teamList[index];
                const isItemFolded = selectedItemIndex !== index;
                const contentContainerClass = isItemFolded ? styles.hideChamp : styles.contentContainerChamp;

                // Find the lack teamOrder number
                const teamOrders = teamList.map(team => team.teamOrder);
                // Create an array from 1 to 5
                const allPossibleOrders = Array.from({ length: 5 }, (_, i) => i + 1);
                // Find the lack teamOrder number
                const lackTeamOrderNumber = allPossibleOrders.find(order => !teamOrders.includes(order));

                return (
                    <div key={index} className={styles.item}>
                        <div className={styles.innerContainer}>
                            <h3 className={styles.title}>{team ? team.name : "No teams here"}</h3>
                            <div
                                className={`${styles.foldableContainer} ${isItemFolded ? styles.folded : ""
                                    }`}>
                                {team && team.available ? (
                                    <>
                                        <button className={styles.foldButton} onClick={() => {
                                            handleAction('update', team)
                                            handleToggleFold(index)
                                        }} >
                                            {isItemFolded ? "Update" : "Cancel"}
                                        </button>
                                        <br />
                                        <button className={styles.foldButton} onClick={() => handleAction('delete', team)}>
                                            Delete
                                        </button>
                                    </>
                                ) : (
                                    <button className={styles.foldButton} onClick={() => {
                                        handleToggleFold(index)
                                        handleAction('new')
                                    }}>
                                        {isItemFolded ? "Add new" : "Cancel"}
                                    </button>
                                )}
                            </div>
                        </div>
                        <div
                            className={`${contentContainerClass} ${isItemFolded ? styles.foldedContent : ""
                                }`}
                        >
                            <div className={styles.content}>
                                {isUpdate ? (
                                    <CreateChampion isUpdate championToUpdate={team || null} onUpdateSuccess={handleUpdateSuccess} index={index} teamList={teamList} setTeamList={setTeamList} />
                                ) : (
                                    <CreateChampion order={lackTeamOrderNumber} onUpdateSuccess={handleUpdateSuccess} />
                                )}
                            </div>
                        </div>

                    </div>
                );
            })}
        </div>
    );
}

export default Champion;
