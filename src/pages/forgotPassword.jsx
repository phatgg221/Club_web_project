import { useEffect,useState } from "react";
import styleForm from "@/styles/Admin.Form.module.css";
import styleBtn from "@/styles/table.module.css";

 function forgotPassword(){
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/member_api`);
        const data = await response.json();
  
        const mongoDataArray = data.data.mongoData;
  
        const user = mongoDataArray.find((user) => user.username === username);
  
        if (user) {
          console.log("Password:", user.password);
          setPassword(user.password);
        } else {
          console.log("User not found");
          // Handle case when user is not found
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
      //Handle success
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
        <label>Your email</label>
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


