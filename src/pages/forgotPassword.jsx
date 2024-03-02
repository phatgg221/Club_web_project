import { useEffect,useState } from "react";
import styleForm from "@/styles/Admin.Form.module.css";
import styleBtn from "@/styles/table.module.css";

 function forgotPassword(){
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [wrongUsername, setWrongUsername] = useState(false);
  const [SendSuccessful, setSendSuccess] = useState(false);


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
          console.log("Password:", user.password);
          setPassword(user.password);
          setWrongUsername(false); // Reset wrongUsername when a user is found
        } else {
          console.log("User not found");
          setWrongUsername(true); // Set wrongUsername to true when user is not found
        }
      } catch (err) {
        console.error("Error fetching data: ", err);
        // Handle error appropriately (e.g., display an error message)
      }
    };
  
    fetchData();
  }, [username]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (wrongUsername) {
      alert("Your username (sID) is wrong");
      return;
    }

    const res = await fetch('/api/sendemail_api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      }),
    });

    const data = await res.json();
    if (data.success) {
      setSendSuccess(true);
    } else {
      // Handle error
    }

  };
    
  return(
    <div
    className={`${styleForm.formContainer} ${styleForm.userResetPasswordContainer}`}
    >
    <h1>Forgot Password</h1>
    <form className={styleForm.form} onSubmit={handleSubmit}>
        <div className={styleForm.inputGroup}>
        <label>Your email (your personal email)</label>
        <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        </div>

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
        {SendSuccessful && (
          <p
            className={styleForm.notificationMessage}
            style={{ color: "green" }}
          >
            Password is successfully sent.
          </p>
        )}
        
        <div className={styleBtn.btnBottomDiv}>
        <button
            className={`${styleBtn.btn} ${styleBtn.btnBottom} ${styleBtn.btnForm}`}
            type="submit"
        >
            Forgot Password
        </button>
        </div>
    </form>
    </div>
);
}

export default forgotPassword;


