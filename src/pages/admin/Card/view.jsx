import { useEffect, useState } from "react";
import React from "react";
import style from "@/styles/table.module.css";
import AdminHeader from "@/components/Header/adminHeader";
const CardTable = () => {
  const [ongoingCompetitions, setOngoingCompetitions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const competitionsResponse = await fetch("/api/card_api");
        const competitionsData = await competitionsResponse.json();
        setOngoingCompetitions(competitionsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (card) => {
    // console.log("card id "+ card._id)
    try {
      const response = await fetch(`/api/card_api?id=${card._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Card delete successful");
        window.location.reload();
      } else {
        console.error("Failed to delete card");
      }
    } catch (error) {
      console.error("Error deleting card", error);
    }
  };
  const handleReturnBut = async () => {
    window.location.href = "/admin/dashboard/view";
  };

  const handleCreateButton = async () => {
    window.location.href = "/admin/Card/form";
  };

  const handleUpdateButton = async (id) => {
    console.log("ID to update " + id);
    window.location.href = `/admin/Card/form?id=${id}`;
  };

  return (
    <>
      <AdminHeader />
      <div className={style.divTable}>
        <table className={style.mainTable}>
          <thead className={style.tableHeading}>
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
            {ongoingCompetitions &&
              ongoingCompetitions.data &&
              ongoingCompetitions.data.mongoData &&
              ongoingCompetitions.data.mongoData.map((item, index) => (
                <tr key={index} className={style.tableRow}>
                  <td>{item.organizer}</td>
                  <td>{item.competitionName}</td>
                  <td>{item.location}</td>
                  <td>
                    <a href={item.linkToWeb}>Link</a>
                  </td>
                  <td>
                    <img
                      className={style.imageTable}
                      src={item.imageURL}
                      alt="Compete image"
                    />
                  </td>
                  <td className={style.btnContainer}>
                    <button className={style.btnUpdate} onClick={() => handleUpdateButton(item._id)}>
                      Update
                    </button>
                    <button className={style.btnDelete} onClick={() => handleDelete(item)}>Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className={style.btnCreateNewCardDiv}>
        <button className={style.btnCreateCard} onClick={handleCreateButton}>
          Create new card event
        </button>
        <button className={style.btnReturn} onClick={handleReturnBut}>Return</button>
      </div>
    </>
  );
};
CardTable.hideLayout = true;
export default CardTable;
