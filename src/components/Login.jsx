import styles from "@/styles/Login.module.css";
import { useState } from 'react';
export default function Login() {
  const [username,setUsername]= useState('');
  const [password, setPassword] = useState('');
  const[formSubmit, setFormSubmit]= useState(false);
  const [isNotCorrect, setIsnotcorrect] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if(!username || !password){
      setFormSubmit(true);
      return;
    }
    const response = await fetch('/api/login_api', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ action: 'login', username, password }),
    });
   
    if (response.ok) {
       const data = await response.json();
       console.log("Login successful");
       window.location.href = '/userMain';
       
    } else {
      setIsnotcorrect(true);
       console.log("Login failed");
      
    }
   };
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
        <input
            type="text"
            id={styles.username}
            placeholder="Username"
            require= {true}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {formSubmit && !username && <p style={{ color: 'red' }}>Username is required</p>}
          <input
            type="password"
            id={styles.password}
            require = {true}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {formSubmit && !username && <p style={{ color: 'red' }}>Password is required</p>}
          {isNotCorrect && <p style= {{color: 'red'}}> Wrong username or password</p>}
          <button type="submit" className={styles.loginButton} onClick={handleSubmit}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
