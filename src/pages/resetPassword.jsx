import React, { useEffect, useState } from "react";
import styleForm from "../styles/Admin.Form.module.css";
import styleBtn from "../styles/table.module.css";
import styleBtn2 from "../styles/resetEmailAndPassword.module.css";
import { useAuth } from "../contexts/AuthContext";
import bcrypt from "bcryptjs"; // Import bcryptjs for hashing
import { useRouter } from "next/router";
export default function ResetPassword() {
  const [users, setUsers] = useState([]);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [cannotEmpty, setCannotEmpty] = useState(false);
  const [wrongPass, setWrongPass] = useState(false);
  const [changeSuccessful, setSuccess] = useState(false);
  const [currentUserIndex, setCurrentUserIndex] = useState(-1);
  const router = useRouter();
  const { userId, isLoggedIn } = useAuth(); // Get userId from useAuth hook

  useEffect(() => {
    const fetchData = async () => {
      if (!isLoggedIn) {
        router.push("/login");
      }
      try {
        const response = await fetch(`/api/member_api`);
        const data = await response.json();
        setUsers(data);

        const mongoDataArray = data.data.mongoData;
        const index = mongoDataArray.findIndex((user) => user._id === userId);
        setCurrentUserIndex(index);
      } catch (err) {
        console.log("Error fecthing data: ", err);
      }
    };
    fetchData();
  }, [isLoggedIn, router, userId]);

  const handleSuccess = () => {
    alert("Password successfully updated.");
    window.location.reload();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    //If users input is empty
    if (!oldPass || !newPass) {
      setCannotEmpty(true);
      return;
    }

    const hashedPassword = users.data.mongoData[currentUserIndex].password; //get the hashed password from the database

    const passwordMatch = await bcrypt.compare(oldPass, hashedPassword);
    // Check if the old password matches the current password (hashed)

    // Check if the old password matches the current password
    if (!passwordMatch) {
      setWrongPass(true);
      return;
    }

    // Hash the new password before sending to the server
    const newHashedPassword = await bcrypt.hash(newPass, 10);
    // Send a request to the server to update the password
    try {
      const response = await fetch(`/api/member_api?id=${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: users.data.mongoData[currentUserIndex].username,
          password: newHashedPassword,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (!data.error) {
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
      <h1 className={styleBtn2.h1}>Reset Your Password</h1>
      <form className={styleForm.form} onSubmit={handleSubmit}>
        <div className={styleForm.inputGroup}>
          <label>Your old password</label>
          <input
            required
            type="password"
            value={oldPass}
            onChange={(e) => setOldPass(e.target.value)}
          />
        </div>
        <div className={styleForm.inputGroup}>
          <label>Your new Password</label>
          <input
            required
            type="password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
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
        <div className={styleBtn.btnBottomDiv}>
          <button className={`${styleBtn2.btn} `} onClick={() => router.back()}>
            Return
          </button>
          <button className={`${styleBtn2.btn} `} type="submit">
            Change Password
          </button>
        </div>
      </form>
      {changeSuccessful && handleSuccess()}
    </div>
  );
}
