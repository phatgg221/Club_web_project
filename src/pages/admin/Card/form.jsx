import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import style from "../../../styles/Admin.Form.module.css";
import styleBtn from "../../../styles/table.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../../../contexts/AuthContext";
const NewCardForm = () => {
  const { isAdmin } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState({
    organizer: "",
    logoURL: "/RMIT-logo.png",
    competitionName: "",
    location: "",
    linkToWeb: "",
    imageURL: "",
    competitionDate: "",
    competitionStatus: "incoming"
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [errorLink, setErrorLink] = useState('');
  const [errorSubmit, setErrorSubmit] = useState('');

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFormData({
      ...formData,
      competitionDate: date.toISOString(),
    });
  };


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
    const { name, value } = event.target;
    const linkPattern = /^(http|https):\/\/.+/;
    if (name === "linkToWeb") {
      if (!linkPattern.test(value)) {
        setErrorSubmit('Invalid format. Cannot submit.');
        setErrorLink('Invalid link format. Requires to start with: http:// or https://');
      } else {
        setErrorSubmit('');
        setErrorLink('');
      };
    }
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };




  const handleReturn = () => {
    window.location.href = "/admin/Card/view";
  };


  const handleUpdate = async (event) => {
    event.preventDefault();
    if (errorSubmit) {
      alert("Invalid form. Cannot submit.");
      return;
    }

    try {
      const formDataCopy = { ...formData };

      // Check if a new image has been selected
      const imageFile = document.getElementById('Image').files[0];
      if (imageFile) {
        const imageData = new FormData();
        imageData.append('file', imageFile);
        imageData.append('upload_preset', 'lzz18aot'); // Replace 'your_upload_preset' with your Cloudinary upload preset

        // Upload new image
        const imageResponse = await fetch('https://api.cloudinary.com/v1_1/dhjapmqga/image/upload', {
          method: 'POST',
          body: imageData,
        });

        if (!imageResponse.ok) {
          throw new Error('Failed to upload image.');
        }

        const imageDataJson = await imageResponse.json();
        formDataCopy.imageURL = imageDataJson.secure_url;
      }

      // Update card data
      const response = await fetch(`/api/card_api?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataCopy),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      window.location.href = "/admin/Card/view";
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formDataCopy = { ...formData };
      const imageData = new FormData();
      imageData.append('file', document.getElementById('Image').files[0]);
      imageData.append('upload_preset', 'lzz18aot'); // Replace 'your_upload_preset' with your Cloudinary upload preset

      const response = await fetch('https://api.cloudinary.com/v1_1/dhjapmqga/image/upload', {
        method: 'POST',
        body: imageData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image.');
      }

      const data = await response.json();
      formDataCopy.imageURL = data.secure_url;

      const cardResponse = await fetch(`/api/card_api`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataCopy),
      });

      if (!cardResponse.ok) {
        throw new Error('Failed to submit card data.');
      }

      window.location.href = "/admin/Card/view";
    } catch (error) {
      console.error("Error:", error);
      setErrorSubmit('Failed to submit. Please try again.');
    }
  };

  useEffect(() => {
    if (!isAdmin) {
      router.push('/login');
    }
  }, [isAdmin, router]);

  return (
    <div className={style.formContainer}>
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.inputGroup}>
          <label>Competition Name:</label>
          <input
            require={true}
            type="text"
            name="competitionName"
            placeholder={isEditMode ? formData.competitionName : ""}
            value={formData.competitionName}
            onChange={handleInputChange}
          />
        </div>
        <div className={style.Row}>
          <div className={`${style.inputGroup} ${style.organizerInput}`}>
            <label>Organizer:</label>
            <input
              require={true}
              type="text"
              name="organizer"
              placeholder={isEditMode ? formData.organizer : ""}
              value={formData.organizer}
              onChange={handleInputChange}
            />
          </div>
          <div className={style.inputGroup}>
            <label>Location:</label>
            <input
              require={true}
              type="text"
              name="location"
              placeholder={isEditMode ? formData.location : ""}
              value={formData.location}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={style.inputGroup}>
          <label>Link to Web:</label>
          <input
            type="text"
            name="linkToWeb"
            placeholder={isEditMode ? formData.linkToWeb : ""}
            value={formData.linkToWeb}
            require={true}
            onChange={handleInputChange}
          />
          {errorLink && <p className="error">{errorLink}</p>}
        </div>
        <div className={style.inputGroup}>
          <label>Date of competition</label>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd" />

        </div>
        <div className={style.inputGroup}>
          <label>Image:</label>
          <input
            id="Image"
            type="file"
            name="imageURL"
            accept='.jpeg, .png, .jpg'
            require={true}
          />
        </div>
        <div className={styleBtn.btnBottomDiv}>
          <button
            className={`${styleBtn.btn} ${styleBtn.btnBottom} ${styleBtn.btnForm}`}
            type="submit"
            onClick={isEditMode ? handleUpdate : handleSubmit}
          >
            {isEditMode ? "Update" : "Create"}
          </button>
          <button
            className={`${styleBtn.btn} ${styleBtn.btnBottom} ${styleBtn.btnForm} `}
            type="button"
            onClick={handleReturn}
          >
            Return
          </button>
        </div>
      </form>
    </div>
  );
};

NewCardForm.hideLayout = true;
export default NewCardForm;