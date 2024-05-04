import { useEffect, useState } from "react";
import React from "react";
import styleForm from "../styles/Admin.Form.module.css";
import styleBtn from "../styles/table.module.css";
import styleHeading from "../styles/resetEmailAndPassword.module.css"
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/router";
import styleBtn2 from "../styles/resetEmailAndPassword.module.css";

// Separate OTPInput component
const OTPInput = ({ onSubmit, onCancel }) => {
  const [otp, setOtp] = useState("");

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  return (
    <div
      className={`${styleForm.formContainer} ${styleForm.userResetPasswordContainer}`}
    >
      <form className={styleForm.form}>
        <div className={styleForm.inputGroup}>
          <label>Enter OTP</label>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={handleOtpChange}
          />
        </div>
        <div className={styleBtn.btnBottomDiv}>
          <button className={`${styleBtn2.btn} `} onClick={() => onSubmit(otp)}>
            Submit
          </button>
        </div>
      </form>
    </div>
    // <div className={styleForm.overlay}>
    //   <div className={styleForm.popup}>
    //     <h2>Enter OTP</h2>
    //     <input
    //       type="text"
    //       placeholder="Enter OTP"
    //       value={otp}
    //       onChange={handleOtpChange}
    //     />
    //     <div>
    //       <button onClick={() => onSubmit(otp)}>Submit</button>

    //     </div>
    //   </div>
    // </div>
  );
};

function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [wrongUsername, setWrongUsername] = useState(false);
  const [sendSuccessful, setSendSuccess] = useState(false);
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const { login, isLoggedIn, userId } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      if (!username) {
        setWrongUsername(false); // Reset wrongUsername when the username is empty
        return;
      }

      try {
        const response = await fetch(`/api/member_api`);
        const data = await response.json();

        const mongoDataArray = data.data.mongoData;

        const user = mongoDataArray.find((user) => user.username === username);

        if (user) {
          setEmail(user.email); // Store the user's email
          const randomOtp = Math.floor(100000 + Math.random() * 900000);
          setGeneratedOtp(randomOtp);

          setWrongUsername(false); // Reset wrongUsername when a user is found
          setShowOTPInput(true);
        } else {
          console.log("User not found");
          setWrongUsername(true); // Set wrongUsername to true when the user is not found
        }
      } catch (err) {
        console.error("Error fetching data: ", err);
        // Handle error appropriately (e.g., display an error message)
      }
    };

    fetchData();
  }, [username]);

  useEffect(() => {
    // Ensure that showOTPInput is set to false if there is no generated OTP
    if (!generatedOtp) {
      setShowOTPInput(false);
    }
  }, [generatedOtp]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (wrongUsername) {
      alert("Your username (sID) is wrong");
      return;
    }

    const res = await fetch("/api/sendemail_api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        otp: generatedOtp,
      }),
    });

    const data = await res.json();
    if (data.success) {
      setSendSuccess(true);
    } else {
      // Handle error
    }
  };

  const handleOTPSubmit = (otp) => {
    // Validate the entered OTP
    if (otp === generatedOtp.toString()) {
      // Proceed with the login process

      // For example, you can set a session or perform other authentication steps
      login(userId, username);

      setSendSuccess(true);
      setShowOTPInput(false);
      // Set login successful state to true

      // Use the push method to navigate to the '/userMain' page
      router.push("/userMain");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const handleOTPCancel = () => {
    setShowOTPInput(false);
  };

  return (
    <div
      className={`${styleForm.formContainer} ${styleForm.userResetPasswordContainer}`}
    >
      <h1 className={styleHeading.h1}>Forgot Password</h1>
      <form className={styleForm.form} onSubmit={handleSubmit}>
        <div className={styleForm.inputGroup}>
          <label>Your username (sID)</label>
          <input
            required
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {wrongUsername && (
          <p className={styleForm.notificationMessage} style={{ color: "red" }}>
            Wrong username.
          </p>
        )}
        {sendSuccessful && (
          <p
            className={styleForm.notificationMessage}
            style={{ color: "green" }}
          >
            OTP is successfully sent.
          </p>
        )}

        <div className={styleBtn.btnBottomDiv}>
          <button
            // className={`${styleBtn.btn} ${styleBtn.btnBottom} ${styleBtn.btnForm}`}
            className={`${styleBtn2.btn} `}
            type="submit"
          >
            Forgot Password
          </button>
        </div>
      </form>

      {showOTPInput && (
        <OTPInput onSubmit={handleOTPSubmit} onCancel={handleOTPCancel} />
      )}
    </div>
  );
}

export default ForgotPassword;
