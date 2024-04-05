import React, { useEffect, useState } from "react";
import Image from "next/image";
import style from "../../styles/content.module.css";
import styleForm from "../../styles/Admin.Form.module.css";
import styleBtn from "../../styles/table.module.css";
import Link from "next/link";
import { set } from "mongoose";
// import { Image } from "next/image";

const Content = ({ close, content, isAdminChangePass }) => {
  const [admin, setAdmin] = useState([]);
  const [oldPass, setOld] = useState("");
  const [newPass, setnewPass] = useState("");
  const [cannotEmpty, setCannotEmpty] = useState(false);
  const [wrongPass, setWropass] = useState(false);
  const [changeSuccessful, setSuccess] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/admin_api`);
        const data = await response.json();

        setAdmin(data);
      } catch (err) {
        console.log("Error fecthing data: ", err);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const id = admin.data.mongoData[0]._id;
    console.log(id + "id");
    // Validate the inputs
    if (!oldPass || !newPass) {
      setCannotEmpty(true);
      return;
    }

    // Check if the old password matches the current password
    if (oldPass !== admin.data.mongoData[0].adminPassword) {
      setWropass(true);
      return;
    }

    // Send a request to the server to update the password
    try {
      const response = await fetch(`/api/admin_api?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adminUsername: admin.data.mongoData[0].adminUsername,
          adminPassword: newPass,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      window.location.reload();
      const data = await response.json();

      if (data.success) {
        setSuccess(true);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  };

  return !isAdminChangePass ? (
    <div className={style.modal}>
      <p className={style.close} onClick={close}>
        ×
      </p>
      <div className={style.header}>{content.name}</div>
      <div className={style.content}>
        <p>{content.contents}</p>
        <p>
          <Image
            className={style.cotentImage}
            src={content.tipImage}
            alt=""
            width={500}
            height={300}
          />
        </p>
      </div>
    </div>
  ) : (
    <div
      className={`${styleForm.formContainer} ${styleForm.formContainerAdminChangePassword}`}
    >
      <form className={styleForm.form} onSubmit={handleSubmit}>
        <div className={styleForm.inputGroup}>
          <label>Your old Password:</label>
          <input
            required
            type="password"
            value={oldPass}
            onChange={(e) => setOld(e.target.value)}
          />
        </div>
        <div className={styleForm.inputGroup}>
          <label>Your new Password:</label>
          <input
            required
            type="password"
            value={newPass}
            onChange={(e) => setnewPass(e.target.value)}
          />
        </div>
        {cannotEmpty && (
          <p className={styleForm.notificationMessage} style={{ color: "red" }}>
            Please fill in the blank.
          </p>
        )}
        {wrongPass && (
          <p className={styleForm.notificationMessage} style={{ color: "red" }}>
            Wrong old password.
          </p>
        )}
        {changeSuccessful && (
          <p
            className={styleForm.notificationMessage}
            style={{ color: "green" }}
          >
            Password successfully updated.
          </p>
        )}
        <div className={styleBtn.btnBottomDiv}>
          <button
            className={`${styleBtn.btn} ${styleBtn.btnBottom} ${styleBtn.btnForm}`}
            type="submit"
          >
            Change password
          </button>
        </div>
      </form>
    </div>
  );
};

export default Content;
