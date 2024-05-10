import React, { useState, useEffect } from "react";
import style from "../../../styles/content.module.css";
import styles from "../../../styles/table.module.css";
import styleForm from "../../../styles/Admin.Form.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuth } from "../../../contexts/AuthContext";
export default function CreateChampion({
  isUpdate,
  championToUpdate,
  onUpdateSuccess,
  order,
  teamList,
  setTeamList,
  close,
}) {
  const { isAdmin } = useAuth();
  const router = useRouter();
  const [championData, setChampionData] = useState({
    teamName: "",
    competitionDescription: "",
    awardDes: "",
    images: "",
    teamOrder: order,
  });
  const [imageLinks, setImageLinks] = useState("");

  useEffect(() => {
    // If in update mode, populate the form with current champion information
    if (isUpdate && championToUpdate) {
      setChampionData({
        id: championToUpdate.id || "",
        teamName: championToUpdate.name || "",
        competitionDescription: championToUpdate.competition || "",
        awardDes: championToUpdate.award || "",
        image: championToUpdate.image || "",
      });

      // Set image links for display
      setImageLinks(championToUpdate.images || "");
    }
  }, [isUpdate, championToUpdate, order]);

  async function saveChampion(event) {
    event.preventDefault();
    const params = new URLSearchParams();
    let iamgeLink = "";
    try {
      const imageFile = document.getElementById("Image").files[0];
      if (imageFile) {
        const imageData = new FormData();
        imageData.append("file", imageFile);
        imageData.append("upload_preset", "lzz18aot");

        const imageResponse = await fetch(
          "https://api.cloudinary.com/v1_1/dhjapmqga/image/upload",
          {
            method: "POST",
            body: imageData,
          }
        );

        if (!imageResponse.ok) {
          throw new Error("Failer to upload image.");
        }

        const imageDataJson = await imageResponse.json();
        iamgeLink = imageDataJson.secure_url;
      }

      params.append("teamName", championData.teamName);
      params.append(
        "competitionDescription",
        championData.competitionDescription
      );
      params.append("awardDes", championData.awardDes);
      if (iamgeLink) {
        params.append("images", iamgeLink);
      } else {
        params.append("images", "");
      }

      console.log("params " + params);

      console.log("Params " + params);
      const url = isUpdate
        ? `/api/champion_api?id=${championToUpdate.id}`
        : "/api/champion_api";

      const response = await fetch(url, {
        method: isUpdate ? "PUT" : "POST",
        body: params,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (response.ok) {
        // Handle success, maybe redirect or show a success message
        console.log(
          `Champion ${isUpdate ? "updated" : "created"} successfully!`
        );
        if (onUpdateSuccess) {
          onUpdateSuccess();
        }
      } else {
        // Handle error, maybe show an error message
        console.error(`Failed to ${isUpdate ? "update" : "create"} champion`);
      }
    } catch (error) {
      console.error(
        `Error ${isUpdate ? "updating" : "creating"} champion:`,
        error
      );
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setChampionData({
      ...championData, // Preserve other existing values
      [name]: value, // Update the specific field with the new value
    });
  };

  const updateTeamOrderInDatabase = async (id, newOrder) => {
    try {
      const response = await fetch(
        `/api/champion_api?id=${id}&teamOrder=${newOrder}`,
        {
          method: "PUT",
        }
      );

      if (response.ok) {
        console.log(`Champion with id ${id}'s teamOrder updated successfully!`);
      } else {
        console.error(`Failed to update champion with id ${id}'s teamOrder`);
      }
    } catch (error) {
      console.error(
        `Error updating champion with id ${id}'s teamOrder:`,
        error
      );
    }
  };

  const handleChangeOrder = async (selectedOrder) => {
    // Calculate the new teamOrder for the current champion based on its index
    const newTeamOrder = selectedOrder;

    const championWithSelectedOrder = teamList.find(
      (team) => team.teamOrder === selectedOrder
    );

    // If championWithSelectedOrder is null, return early
    if (!championWithSelectedOrder) {
      return;
    }
    if (championWithSelectedOrder) {
      // Swap the teamOrder values in the local teamList state
      setTeamList((prevTeamList) =>
        prevTeamList.map((team) => {
          if (team.id === championData.id) {
            return { ...team, teamOrder: newTeamOrder };
          } else if (team.id === championWithSelectedOrder.id) {
            return { ...team, teamOrder: championData.teamOrder };
          }
          return team;
        })
      );

      // Update team orders in the database
      await Promise.all([
        updateTeamOrderInDatabase(championData.id, newTeamOrder),
        updateTeamOrderInDatabase(
          championWithSelectedOrder.id,
          championData.teamOrder
        ),
      ]);

      // Update the teamOrder in the form state
      setChampionData((prevData) => ({
        ...prevData,
        teamOrder: newTeamOrder,
      }));
    } else {
      // If the champion with the selected order is not found, just update the teamOrder
      setChampionData((prevData) => ({
        ...prevData,
        teamOrder: newTeamOrder,
      }));

      // Update team order in the database
      await updateTeamOrderInDatabase(championData.id, newTeamOrder);
    }

    // Sort the teamList array by teamOrder
    setTeamList((prevTeamList) =>
      prevTeamList.sort((a, b) => a.teamOrder - b.teamOrder)
    );
  };

  // update - remove any image

  useEffect(() => {
    if (!isAdmin) {
      router.push("/login");
    }
  }, [isAdmin, router]);

  return (
    <div>
      <div className={style.modal}>
        <p className={style.close} onClick={close}>
          ×
        </p>
        <div className={style.header} style={{ fontSize: "30px" }}>
          {" "}
          {isUpdate ? "Update" : "Add New"} Champion
        </div>
        <div className={style.content}>
          <form
            style={{ padding: "20px", margin: "auto", width: "100%" }}
            className={styleForm.form}
            onSubmit={saveChampion}
          >
            <label htmlFor="teamName">Team Name</label>
            <input
              type="text"
              id="teamName"
              name="teamName"
              placeholder={championToUpdate ? championToUpdate.teamName : ""}
              value={championData.teamName}
              onChange={handleInputChange}
              required
            />

            <br />

            <label htmlFor="competitionDescription">
              Competition Description
            </label>
            <input
              type="text"
              id="competitionDescription"
              name="competitionDescription"
              placeholder={
                championToUpdate ? championToUpdate.competitionDescription : ""
              }
              value={championData.competitionDescription}
              onChange={handleInputChange}
              required
            />

            <br />

            <label htmlFor="awardDes">Award Description</label>
            <input
              type="text"
              id="awardDes"
              name="awardDes"
              placeholder={championToUpdate ? championToUpdate.awardDes : ""}
              value={championData.awardDes}
              onChange={handleInputChange}
              required
            />

            <br />

            <br />
            <label>Images</label>
            <input
              id="Image"
              type="file"
              name="images"
              accept=".jpg, .jpeg, .png"
              required={true}
            ></input>

            <br />
            <button
              style={{ marginTop: "5%", marginLeft: "30%" }}
              className={`${styles.btn} ${styles.btnBottom}`}
              type="submit"
            >
              {isUpdate ? "Update" : "Add"}
              Champion
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
