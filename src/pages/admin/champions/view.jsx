import { useEffect, useState } from "react";
import React from "react";
import ChampionCard from "../../../components/menuChamp/championCard";
import style from "../../../styles/table.module.css";
import CreateChampion from "../../../pages/admin/champions/form";
import AdminHeader from "../../../components/Header/adminHeader";
import Popup from "reactjs-popup";
import { useRouter } from "next/router";
import { useAuth } from "../../../contexts/AuthContext";
function Champion() {
  const [teamList, setTeamList] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const router = useRouter();
  const { isAdmin } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("../../api/champion_api");
        const data = await response.json();

        // Transform the data into the desired format
        let formattedData = data.data.mongoData.map((item, index) => ({
          id: item._id,
          name: item.teamName || false,
          competition: item.competitionDescription || false,
          award: item.awardDes || false,
          images: item.image || "",
          available: item.teamName || false,
          index,
          teamOrder: item.teamOrder || index, // Add teamOrder to each item
        }));

        // Sort the formattedData array by teamOrder
        formattedData = formattedData.sort((a, b) => a.teamOrder - b.teamOrder);

        setTeamList(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleReturn = async () => {
    window.location.href = "/admin/dashboard/view";
  };
  const handleToggleFold = (index) => {
    setSelectedItemIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleAction = async (action, champion) => {
    switch (action) {
      case "update":
        setChampionToUpdate(champion);
        setIsUpdate(true);
        break;
      case "delete":
        try {
          // Make a DELETE request to your API endpoint
          const response = await fetch(`/api/champion_api?id=${champion.id}`, {
            method: "DELETE",
          });

          if (response.ok) {
            // Handle success, maybe refresh the list or perform other actions
            console.log(`Champion deleted successfully!`);
            handleUpdateSuccess();
          } else {
            // Handle error, maybe show an error message
            console.error("Failed to delete champion");
          }
        } catch (error) {
          console.error("Error deleting champion:", error);
        }
        break;
      case "new":
        setIsUpdate(false);
        break;
      default:
        break;
    }
  };

  const handleUpdateSuccess = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (!isAdmin) {
      router.push("/login");
    }
  }, [isAdmin, router]);

  return (
    <div>
      <AdminHeader />
      <ChampionCard></ChampionCard>

      <div className={style.divTable}>
        <table className={style.mainTable}>
          <thead className={style.tableHeading}>
            <tr>
              {/* <th>No</th> */}
              <th>Team name</th>
              <th>Competition Description</th>
              <th>Award Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teamList.map((team, index) => {
              const isItemFolded = selectedItemIndex !== index;

              // Find the lack teamOrder number
              const teamOrders = teamList.map((team) => team.teamOrder);
              // Create an array from 1 to the length of teamList
              const allPossibleOrders = Array.from(
                { length: teamList.length },
                (_, i) => i + 1
              );
              // Find the lack teamOrder number
              const lackTeamOrderNumber = allPossibleOrders.find(
                (order) => !teamOrders.includes(order)
              );

              return (
                <tr key={index} className={style.tableRow}>
                  {/* <td>{index + 1}</td> */}
                  <td>{team ? team.name : "No teams here"}</td>
                  <td>{team ? team.competition : ""}</td>
                  <td>{team ? team.award : ""}</td>
                  <td className={style.btnContainer}>
                    <div className={style.btnTableDiv}>
                      {team && team.available ? (
                        <>
                          <div className={style.btnBottomDiv}>
                            <Popup
                              modal
                              trigger={
                                <button
                                  className={`${style.btn} ${style.btnBottom}`}
                                  onClick={() => {
                                    handleAction("update", team);
                                    handleToggleFold(index);
                                  }}
                                >
                                  {isItemFolded ? "Update" : "Cancel"}
                                </button>
                              }
                            >
                              {(close) => (
                                <CreateChampion
                                  isUpdate
                                  championToUpdate={team || null}
                                  onUpdateSuccess={handleUpdateSuccess}
                                  index={index}
                                  teamList={teamList}
                                  setTeamList={setTeamList}
                                  close={close}
                                />
                              )}
                            </Popup>

                            <br />
                            <button
                              className={`${style.btn} ${style.btnBottom}`}
                              onClick={() => handleAction("delete", team)}
                            >
                              Delete
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className={style.btnBottomDiv}>
                          <Popup
                            modal
                            trigger={
                              <button
                                className={`${style.btn} ${style.btnBottom}`}
                                onClick={() => {
                                  handleToggleFold(index);
                                  handleAction("new");
                                }}
                              >
                                {isItemFolded ? "Add new" : "Cancel"}
                              </button>
                            }
                          >
                            {(close) => (
                              <CreateChampion
                                order={lackTeamOrderNumber}
                                onUpdateSuccess={handleUpdateSuccess}
                                close={close}
                              />
                            )}
                          </Popup>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className={style.btnBottomDiv}>
        <div>
          <Popup
            modal
            trigger={
              <button
                className={`${style.btn} ${style.btnBottom}`}
                onClick={() => {
                  handleToggleFold(index);
                  handleAction("new");
                }}
              >
                Create new
              </button>
            }
          >
            {(close) => (
              <CreateChampion
                onUpdateSuccess={handleUpdateSuccess}
                close={close}
              />
            )}
          </Popup>
        </div>
        <div>
          <button
            className={`${style.btn} ${style.btnBottom}`}
            onClick={handleReturn}
          >
            Return
          </button>
        </div>
      </div>
    </div>
  );
}
Champion.hideLayout = true;
export default Champion;
