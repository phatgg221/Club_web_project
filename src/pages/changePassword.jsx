import React, { useEffect, useState } from "react";
import styleForm from "../styles/Admin.Form.module.css";
import styleBtn from "../styles/table.module.css";
import styleBtn2 from "../styles/resetEmailAndPassword.module.css";
import bcrypt from "bcryptjs"; // Import bcryptjs for hashing
import { useRouter } from "next/router";

export default function ChangePassword() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [cannotEmpty, setCannotEmpty] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const [changeSuccessful, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/member_api`);
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.log("Error fetching data: ", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Check if the user has been verified by OTP
    const otpVerified = sessionStorage.getItem("otpVerified");
    if (!otpVerified || otpVerified !== "true") {
      router.push("/forgotPassword");
    }
  }, [router]);

  const handleSuccess = () => {
    alert("Password successfully updated.");
    sessionStorage.removeItem("otpVerified");
    router.push("/login");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // If users input is empty
    if (!username || !newPass || !confirmPass) {
      setCannotEmpty(true);
      return;
    }

    // Check if new password and confirm password match
    if (newPass !== confirmPass) {
      setPasswordMismatch(true);
      return;
    }

    const userIndex = users.data.mongoData.findIndex((user) => user.username === username);

    if (userIndex === -1) {
      setUserNotFound(true);
      return;
    }

    // Hash the new password before sending it to the server
    const newHashedPassword = await bcrypt.hash(newPass, 10);
    // Send a request to the server to update the password
    try {
      const response = await fetch(`/api/member_api?id=${users.data.mongoData[userIndex]._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: users.data.mongoData[userIndex].username,
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
      <h1 className={styleBtn2.h1}>Change Your Password</h1>
      <form className={styleForm.form} onSubmit={handleSubmit}>
        <div className={styleForm.inputGroup}>
          <label>Your Username</label>
          <input
            required
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styleForm.inputGroup}>
          <label>Your New Password</label>
          <input
            required
            type="password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
          />
        </div>
        <div className={styleForm.inputGroup}>
          <label>Confirm New Password</label>
          <input
            required
            type="password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />
        </div>
        {cannotEmpty && (
          <p className={styleForm.notificationMessage} style={{ color: "red" }}>
            Please fill in all fields.
          </p>
        )}
        {passwordMismatch && (
          <p className={styleForm.notificationMessage} style={{ color: "red" }}>
            Passwords do not match.
          </p>
        )}
        {userNotFound && (
          <p className={styleForm.notificationMessage} style={{ color: "red" }}>
            User not found.
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
