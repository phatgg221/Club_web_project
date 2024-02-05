import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import style from "@/styles/Admin.Form.module.css";
import styleBtn from "@/styles/table.module.css";

const NewCardForm = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log("id asdasdasd" + id);
  const [formData, setFormData] = useState({
    organizer: "",
    logoURL: "/RMIT-logo.png",
    competitionName: "",
    location: "",
    linkToWeb: "",
    imageURL: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);

  // console.log("id "+ initialCard._id);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          setIsEditMode(true);
          const response = await fetch(`/api/card_api?id=${id}`);
          const data = await response.json();
          if (
            data &&
            data.error === false &&
            data.statusCode === 200 &&
            data.data &&
            data.data.cardData &&
            data.data.cardData.data
          ) {
            setFormData(data.data.cardData.data);
          } else {
            console.error("Data structure is not as expected:", data);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [id]);
  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleReturn = () => {
    window.location.href = "/admin/Card/view";
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    fetch("/api/card_api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        window.location.href = "/admin/Card/view";

        return response.json();
      })
      .then((data) => console.log("Success:", data))
      .catch((error) => console.error("Error:", error));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/card_api?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      window.location.href = "/admin/Card/view";
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className={style.formContainer}>
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.inputGroup}>
          <label>Competition Name</label>
          <input
            required={true}
            type="text"
            name="competitionName"
            placeholder={isEditMode ? formData.competitionName : ""}
            value={formData.competitionName}
            onChange={handleInputChange}
          />
        </div>
        <div className={style.Row}>
          <div className={`${style.inputGroup} ${style.organizerInput}`}>
            <label>Organizer</label>
            <input
              required={true}
              type="text"
              name="organizer"
              placeholder={isEditMode ? formData.organizer : ""}
              value={formData.organizer}
              onChange={handleInputChange}
            />
          </div>
          <div className={style.inputGroup}>
            <label>Location</label>
            <input
              required={true}
              type="text"
              name="location"
              placeholder={isEditMode ? formData.location : ""}
              value={formData.location}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={style.inputGroup}>
          <label>Link to Web</label>
          <input
            type="text"
            name="linkToWeb"
            placeholder={isEditMode ? formData.linkToWeb : ""}
            value={formData.linkToWeb}
            onChange={handleInputChange}
          />
        </div>

        <div className={style.inputGroup}>
          <label>Image URL</label>
          <input
            type="text"
            name="imageURL"
            placeholder={isEditMode ? formData.imageURL : ""}
            value={formData.imageURL}
            onChange={handleInputChange}
          />
        </div>

        <div className={styleBtn.btnBottomDiv}>
          <button
            className={`${styleBtn.btn} ${styleBtn.btnBottom} ${styleBtn.btnForm}`}
            type="button"
            onClick={handleReturn}
          >
            Return
          </button>
          <button
            className={`${styleBtn.btn} ${styleBtn.btnBottom} ${styleBtn.btnForm} `}
            type="submit"
            onClick={isEditMode ? handleUpdate : handleSubmit}
          >
            {isEditMode ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

NewCardForm.hideLayout = true;
export default NewCardForm;
