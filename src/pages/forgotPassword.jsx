import { useEffect,useState } from "react";
import styleForm from "@/styles/Admin.Form.module.css";
import styleBtn from "@/styles/table.module.css";

 function forgotPassword(){
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    

    const res = await fetch('/api/sendemail_api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        subject: 'Forgot Password',
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


