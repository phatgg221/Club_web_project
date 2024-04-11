import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import style from "../../../styles/Admin.Form.module.css";
import styleBtn from "../../../styles/table.module.css";
import { useAuth } from "../../../contexts/AuthContext";
const NewSampleForm = () => {
  const router = useRouter();
  const { id } = router.query;
  const { isAdmin } = useAuth();
  const [formData, setFormData] = useState({
    sampleName: "",
    sampleContents: "",
    sampleAuthor: "",
    sampleLink: "",
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [errorLink, setErrorLink] = useState('');
  const [errorSubmit, setErrorSubmit] = useState('');

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          setIsEditMode(true);
          const response = await fetch(`/api/sample_api?id=${id}`);
          const data = await response.json();
          if (
            data &&
            data.error === false &&
            data.statusCode === 200 &&
            data.data &&
            data.data.sampleData &&
            data.data.sampleData.data
          ) {
            setFormData(data.data.sampleData.data);
          } else {
            console.error("Data structure is not as expected: ", data);
          }
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };
      fetchData();
    }
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const linkPattern = /^(http|https):\/\/.+/;
    if (name === "sampleLink") {
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

  const hanldeReturn = () => {
    window.location.href = "/admin/sample/view";
  };

  const hanldeSubmit = async (event) => {
    event.preventDefault();
    if (errorSubmit) {
      alert("Invalid form. Cannot submit.");
      return;
    }

    fetch("/api/sample_api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network reponse was not ok");
        }

        window.location.href = "/admin/sample/view";

        return response.json();
      })
      .then((data) => console.log("Success: ", data))
      .catch((error) => console.error("Error", error));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (errorSubmit) {
      alert("Invalid form. Cannot submit.");
      return;
    }

    try {
      const response = await fetch(`/api/sample_api?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      window.location.href = "/admin/sample/view";
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    if (!isAdmin) {
      router.push('/login');
    }
  }, [isAdmin, router]);

  return (
    <div className={style.formContainer}>
      <form className={style.form} onSubmit={hanldeSubmit}>
        <div className={style.inputGroup}>
          <label>Sample name:</label>
          <input
            required={true}
            type="text"
            name="sampleName"
            placeholder={isEditMode ? formData.sampleName : ""}
            value={formData.sampleName}
            onChange={handleInputChange}
          />
        </div>
        <div className={style.Row}>
          <div className={`${style.inputGroup} ${style.organizerInput}`}>
            <label>Contents:</label>
            <input
              required={true}
              type="text"
              name="sampleContents"
              placeholder={isEditMode ? formData.sampleContents : ""}
              value={formData.sampleContents}
              onChange={handleInputChange}
            />
          </div>
          <div className={style.inputGroup}>
            <label>Author:</label>
            <input
              required={true}
              type="text"
              name="sampleAuthor"
              placeholder={isEditMode ? formData.sampleAuthor : ""}
              value={formData.sampleAuthor}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={style.inputGroup}>
          <label>Link:</label>
          <input
            required={true}
            type="text"
            name="sampleLink"
            placeholder={isEditMode ? formData.sampleLink : ""}
            value={formData.sampleLink}
            onChange={handleInputChange}
          />
          {errorLink && <p className="error">{errorLink}</p>}
        </div>
        <div className={styleBtn.btnBottomDiv}>
          <button
            className={`${styleBtn.btn} ${styleBtn.btnBottom} ${styleBtn.btnForm}`}
            type="submit"
            onClick={isEditMode ? handleUpdate : hanldeSubmit}
          >
            {isEditMode ? "Update" : "Create"}
          </button>
          <button
            className={`${styleBtn.btn} ${styleBtn.btnBottom} ${styleBtn.btnForm}`}
            type="button"
            onClick={hanldeReturn}
          >
            {" "}
            Return{" "}
          </button>
        </div>
      </form>
    </div>
  );
};

NewSampleForm.hideLayout = true;
export default NewSampleForm;
