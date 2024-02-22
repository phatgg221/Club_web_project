import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import style from "@/styles/Admin.Form.module.css";
import styleBtn from "@/styles/table.module.css";

const NewTipForm = () => {
  const router = useRouter();
  const { id } = router.query;
  const [contentCount, setContentCount] = useState(1);
  const [contents, setContents] = useState([
    { name: "", contents: "", tipImage: "" },
  ]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    tipName: "",
    tipsLink: "",
    realContent: [],
  });

  const [errorLink, setErrorLink] = useState('');
  const [errorSubmit, setErrorSubmit] = useState('');

  useEffect(() => {
    setFormData((prevState) => ({ ...prevState, realContent: contents }));
  }, [contents]);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          setIsEditMode(true);
          const response = await fetch(`/api/tip_api?id=${id}`);
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
            setContentCount(data.data.sampleData.data.realContent.length);
            setContents(data.data.sampleData.data.realContent);
          } else {
            console.error("Data structure is not as expected: ", data);
          }
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      }
    };
    fetchData();
  }, [id]);

  const handleInputChange = (index, event) => {
    const newContents = [...contents];
    newContents[index][event.target.name] = event.target.value;
    setContents(newContents);
  };
  const handleInputChangeUpdate = (index, event) => {
    const newContents = [...formData.realContent];
    newContents[index][event.target.name] = event.target.value;
    setFormData((prevState) => ({ ...prevState, realContent: newContents }));
  };
  const handleAddContent = () => {
    setContentCount(contentCount + 1);
    setContents([...contents, { name: "", contents: "", tipImage: "" }]);
  };

  const handleDelete = (index) => {
    const newContents = [...contents];
    newContents.splice(index, 1);
    setContents(newContents);
  };

  const hanldeReturn = () => {
    window.location.href = "/admin/tips/tips";
  };

  const hanldeSubmit = async (event) => {
    event.preventDefault();
    setFormData((prevState) => ({ ...prevState, realContent: contents }));
    try {
      const response = await fetch("/api/tip_api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      window.location.href = "/admin/tips/tips";
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/tip_api?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      window.location.href = "/admin/tips/tips";
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputValidation = (event) => {
    const { name, value } = event.target;
    const linkPattern = /^(http|https):\/\/.+/;
    if (name === "tipsLink") {
      if (!linkPattern.test(value)) {
        setErrorSubmit('Invalid format. Cannot submit.');
        setErrorLink('Invalid link format. Requires to start with: http:// or https://');
        return false;
      } else {
        setErrorSubmit(''); setErrorLink('');
        return true;
      };
    }
  }

  return (
    <div className={`${style.formContainer} ${style.formContainerTips}`}>
      <form
        className={`${style.form} ${style.formTips}`}
        onSubmit={hanldeSubmit}
      >
        <div className={style.inputGroup}>
          <label>Tip Name</label>
          <input
            required={true}
            type="text"
            name="tipName"
            value={formData.tipName}
            placeholder={isEditMode ? formData.tipName : ""}
            onChange={(e) =>
              setFormData({ ...formData, tipName: e.target.value })
            }
          />
        </div>
        <div className={style.inputGroup}>
          <label>Tip Link</label>
          <input
            required={true}
            type="text"
            name="tipsLink"
            value={formData.tipsLink}
            placeholder={isEditMode ? formData.tipsLink : ""}
            onChange={(e) => {
              handleInputValidation(e)
              setFormData({ ...formData, tipsLink: e.target.value })
            }}
          />
          {errorLink && <p className="error">{errorLink}</p>}
        </div>

        {!isEditMode &&
          contents.map((content, index) => (
            <div key={index} className={style.Row}>
              <div className={`${style.inputGroup} ${style.organizerInput} `}>
                <label>Content Name</label>
                <input
                  type="text"
                  name="name"
                  value={content.name}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </div>
              <div
                className={`${style.inputGroup} ${style.organizerInput} ${style.contentInput}`}
              >
                <label>Content</label>
                <input
                  type="text"
                  name="contents"
                  value={content.contents}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </div>
              <div className={`${style.inputGroup}  `}>
                <label>Image Link</label>
                <input
                  type="text"
                  name="tipImage"
                  value={content.tipImage}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </div>

              <div className={`${style.inputGroup} ${style.centered} `}>
                <label className={style.hideLable}> a</label>
                <button
                  className={`${styleBtn.btn} ${style.btnTip} `}
                  type="button"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

        {isEditMode &&
          contents.map((content, index) => (
            <div key={index} className={`${style.Row} }`}>
              <div className={`${style.inputGroup} ${style.organizerInput}`}>
                <label>Content Name</label>
                <input
                  type="text"
                  name="name"
                  value={content.name}
                  onChange={(e) => handleInputChangeUpdate(index, e)}
                />
              </div>
              <div
                className={`${style.inputGroup} ${style.organizerInput} ${style.contentInput}`}
              >
                <label>Content</label>
                <input
                  type="text"
                  name="contents"
                  value={content.contents}
                  onChange={(e) => handleInputChangeUpdate(index, e)}
                />
              </div>
              <div className={style.inputGroup}>
                <label>Image Link</label>
                <input
                  type="text"
                  name="tipImage"
                  value={content.tipImage}
                  onChange={(e) => handleInputChangeUpdate(index, e)}
                />
              </div>
              <div className={`${style.inputGroup} ${style.centered} `}>
                <label className={style.hideLable}> a</label>
                <button
                  className={`${styleBtn.btn} ${style.btnTip}`}
                  type="button"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        <div className={styleBtn.btnBottomDiv}>
          <button
            className={`${styleBtn.btn} ${styleBtn.btnBottom} `}
            type="button"
            onClick={handleAddContent}
          >
            Add more tip content
          </button>

          <button
            className={`${styleBtn.btn} ${styleBtn.btnBottom}`}
            type="submit"
            onClick={isEditMode ? handleUpdate : hanldeSubmit}
          >
            {isEditMode ? "Update" : "Create"}
          </button>
          <button
            className={`${styleBtn.btn} ${styleBtn.btnBottom} `}
            type="button"
            onClick={hanldeReturn}
          >
            Return
          </button>
        </div>
        {errorSubmit && <p className="error">{errorSubmit}</p>}
      </form>
    </div>
  );
};

NewTipForm.hideLayout = true;
export default NewTipForm;
