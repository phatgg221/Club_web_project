import styles from "@/styles/Login.module.css";

export default function Login() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.brand}>
        <img
          className={styles.loginLogo}
          src="/GFCC.png"
          alt="GFCC Logo"
          width="100"
          height="92"
        ></img>
        <div className={styles.slogan}>
          <span className={styles.line}>Be Brave.</span>
          <span className={styles.line}>Be Competitive.</span>
          <span className={styles.line}>Be Relentless.</span>
        </div>
      </div>
      <div className={styles.loginSect}>
        <form className={styles.loginForm}>
          <input type="text" id={styles.username} placeholder="Username" />
          <input type="password" id={styles.password} placeholder="Password" />
          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
