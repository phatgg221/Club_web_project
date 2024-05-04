import React, { useEffect, useState } from "react";
import styleForm from "../styles/Admin.Form.module.css";
import styleBtn from "../styles/table.module.css";
import styleBtn2 from "../styles/resetEmailAndPassword.module.css";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/router";

export default function ResetEmail() {
  const [users, setUsers] = useState([]);
  const [oldEmail, setOldEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [cannotEmpty, setCannotEmpty] = useState(false);
  const [emailNotMatch, setEmailNotMatch] = useState(false);
  const [changeSuccessful, setSuccess] = useState(false);
  const [currentUserIndex, setCurrentUserIndex] = useState(-1);
  const router = useRouter();
  const { userId, isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/member_api`);
        const data = await response.json();
        setUsers(data);

        const mongoDataArray = data.data.mongoData;
        const index = mongoDataArray.findIndex((user) => user._id === userId);
        setCurrentUserIndex(index);
        setOldEmail(mongoDataArray[index].email);
      } catch (err) {
        console.log("Error fetching data: ", err);
      }
    };
    fetchData();
  }, [isLoggedIn, router, userId]);

  const handleSuccess = () => {
    alert("Email successfully updated.");
    window.location.reload();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!newEmail) {
      setCannotEmpty(true);
      return;
    }

    const currentUserEmail = users.data.mongoData[currentUserIndex].email;

    if (currentUserEmail !== oldEmail) {
      setEmailNotMatch(true);
      return;
    }

    try {
      const response = await fetch(`/api/member_api?id=${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: newEmail,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.updated_data.data.email === newEmail) {
        setSuccess(true);
        return;
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

  return (
    <div
      className={`${styleForm.formContainer} ${styleForm.userResetPasswordContainer}`}
    >
      <h1 className={styleBtn2.h1}>Reset Your Email</h1>
      <form className={styleForm.form} onSubmit={handleSubmit}>
        <div className={styleForm.inputGroup}>
          <label>Your old email</label>
          <input value={oldEmail} disabled></input>
          <label>Enter new email</label>
          <input
            required
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </div>
        {cannotEmpty && (
          <p className={styleForm.notificationMessage} style={{ color: "red" }}>
            Please fill in the blank.
          </p>
        )}
        {emailNotMatch && (
          <p className={styleForm.notificationMessage} style={{ color: "red" }}>
            The current email does not match.
          </p>
        )}

        <div className={styleBtn.btnBottomDiv}>
          <button className={`${styleBtn2.btn} `} onClick={() => router.back()}>
            Return
          </button>
          <button className={`${styleBtn2.btn}`} type="submit">
            Change Email
          </button>
        </div>
      </form>
      {changeSuccessful && handleSuccess()}
    </div>
  );
}
