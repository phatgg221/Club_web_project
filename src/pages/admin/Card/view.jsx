import { useEffect, useState } from "react";
import React from "react";
import style from "@/styles/table.module.css";

const CardTable= () => {
    const [ongoingCompetitions, setOngoingCompetitions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const competitionsResponse = await fetch('/api/card_api');
                const competitionsData = await competitionsResponse.json();
                setOngoingCompetitions(competitionsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <table className={style.mainTable}>
                <thead>
                    <tr>
                        <th>Organizer</th>
                        <th>Competition name</th>
                        <th>Location</th>
                        <th>Link to web</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {ongoingCompetitions && ongoingCompetitions.data && ongoingCompetitions.data.mongoData && ongoingCompetitions.data.mongoData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.organizer}</td>
                            <td>{item.competitionName}</td>
                            <td>{item.location}</td>
                            <td><a href={item.linkToWeb}>Link</a></td>
                            <td><img className={style.imageTable} src={item.imageURL} alt="Compete image" /></td>
                            <td><button>Update</button><button>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="button-container">
                <button>Create new card evnet</button>
                <button>Return</button>
            </div>
        </>
    );
}

export default CardTable;
