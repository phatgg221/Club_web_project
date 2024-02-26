import styles from "@/styles/Profile.module.css";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function Profile() {
  const { isLoggedIn, logout } = useAuth();
  const [changePw, setChangePw] = useState(false);

  const handleLogOut = () => {
    if (isLoggedIn) {
      logout();
      document.location = "/";
    } else {
      document.location = "/login";
    }
  }

  function toggleChangePw() {
    window.location.href = "/resetPassword";
  }


  return (
    <div className={styles.container}>
      <img className={styles.img} src="/HappyGFCC.png" width="100px" />
      <p className={styles.p}>
        Username: <span>Silver Flame</span>
      </p>
      <p className={styles.p}>
        Major: <span>Business Management</span>
      </p>
      <button className={styles.button} onClick={toggleChangePw}>
        Update your password
      </button>

      
    </div>
  );
}
