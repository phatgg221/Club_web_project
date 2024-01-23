import styles from "@/styles/Profile.module.css";
import { useState } from "react";

export default function Profile() {
  const [changePw, setChangePw] = useState(false);

  function logout() {
    document.location = "/";
  }

  function toggleChangePw() {
    setChangePw(!changePw);
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

      {changePw && (
        <div className={styles.inputContainer}>
          <form>
            <input
              className={styles.inputPass}
              type="text"
              placeholder="Enter current password"
            />
          </form>
          <form>
            <input
              className={styles.inputPass}
              type="text"
              placeholder="Enter new password"
            />
          </form>
          <button className={styles.submit}>Submit</button>
        </div>
      )}

      <button className={styles.logout} onClick={logout}>
        Logout
      </button>
    </div>
  );
}
