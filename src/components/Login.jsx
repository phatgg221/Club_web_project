import styles from "../styles/Login.module.css";
import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

export default function Login() {
  const router = useRouter();
  const { login, isLoggedIn, isAdmin, adminLogin, highestAdminLogin } =
    useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formSubmit, setFormSubmit] = useState(false);
  const [isNotCorrect, setIsnotcorrect] = useState(false);
  const [admin, setAdmin] = useState([]);
  const [capsLockOn, setCapsLockOn] = useState(false);

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

    if (!username || !password) {
      setFormSubmit(true);
      return;
    }

    if (username === "admin") {
      // Check if the entered password matches the admin password
      if (password === admin.data.mongoData[0].adminPassword) {
        // Perform admin login logic here, for example, redirect to admin dashboard
        highestAdminLogin();
        router.push("/admin/dashboard/view");

        return;
      } else {
        setIsnotcorrect(true);
        return;
      }
    }

    const response = await fetch("/api/login_api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "login", username, password }),
    });

    if (response.ok) {
      try {
        const data = await response.json();
        console.log("Data:", data.data);
        const decodedToken = jwt.decode(data.data.token, { complete: true });
        console.log("Decoded token:", decodedToken.payload.user.id);

        const userId = decodedToken.payload.user.id;
        const isAdmin = data.data.user.isAdmin;
        const username2 = username;
        // console.log(username2+ "username 2");
        // console.log(JSON.stringify(decodedToken.payload.user)+ "akjsdnajnc");
        if (userId) {
          if (isAdmin) {
            router.push("/admin/dashboard/view");
            adminLogin();
            login(userId, username2);
          } else {
            console.log("User ID:", userId);

            login(userId, username2);

            router.push("/userMain");
          }
        } else {
          console.error("Invalid token structure");
        }
      } catch (err) {
        console.error("Token verification failed:", err);
      }

      console.log("Login successful");
    } else {
      setIsnotcorrect(true);
      console.log("Login failed");
    }
  };

  const handleCapsLock = (e) => {
    const capsLockActivated = e.getModifierState("CapsLock");
    setCapsLockOn(capsLockActivated);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.brand}>
        <Image
          className={styles.loginLogo}
          src="/GFCC.png"
          alt="GFCC Logo"
          width="100"
          height="92"
        ></Image>
        <div className={styles.slogan}>
          <span className={styles.line}>Be Brave.</span>
          <span className={styles.line}>Be Competitive.</span>
          <span className={styles.line}>Be Relentless.</span>
        </div>
      </div>
      <div className={styles.loginSect}>
        <form className={styles.loginForm}>
          <input
            type="text"
            id={styles.username}
            placeholder="Username"
            require={true}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {formSubmit && !username && (
            <p style={{ color: "red" }}>Username is required</p>
          )}
          <div className={styles.passwordContainer}>
            <input
              type="password"
              id={styles.password}
              required={true} // It should be 'required' not 'require'
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyUp={handleCapsLock}
              onKeyDown={handleCapsLock}
            />
            {capsLockOn && (
              <Image
                src="/capslockIcon3.png"
                width={30}
                height={50}
                alt="Caps lock is on"
              />
            )}
          </div>

          <Link href="/forgotPassword">Forgot Password?</Link>
          {formSubmit && !username && (
            <p style={{ color: "red" }}>Password is required</p>
          )}
          {isNotCorrect && (
            <p style={{ color: "red" }}> Wrong username or password</p>
          )}
          <button
            type="submit"
            className={styles.loginButton}
            onClick={handleSubmit}
          >
            Login
          </button>
          <p className={styles.forgotPasswordLink}></p>
        </form>
      </div>
    </div>
  );
}
