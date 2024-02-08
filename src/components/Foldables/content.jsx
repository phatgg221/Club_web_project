import React, { useEffect, useState } from "react";
import Image from "next/image";
import style from "@/styles/content.module.css";
import { set } from "mongoose";

const Content = ({ close, content, isAdminChangePass }) => {
  
  const [admin, setAdmin] = useState([]);
  const[oldPass, setOld]= useState('');
  const [newPass, setnewPass] = useState('');
  const [cannotEmpty, setCannotEmpty]= useState(false);
  const [wrongPass, setWropass]= useState(false);
  const [changeSuccessful, setSuccess]= useState(false);
  useEffect(() => {
    const fetchData= async () =>{
      try{
        const response= await fetch(`/api/admin_api`);
        const data= await response.json();

        setAdmin(data);
      }catch(err){
        console.log('Error fecthing data: ', err);
      }
    };
    fetchData();
  }, []);

  const handleSubmit= async (event)=>{
    event.preventDefault();

    if(!oldPass || !newPass){
      setCannotEmpty(true);
      return;
    }

    if(oldPass === admin.data.mongoData[0].adminPassword){
        setSuccess(true);
    }else{
      setWropass(true);
    }
    
  }
  
  return (
    !isAdminChangePass ? (
      <div className={style.modal}>
        <a className={style.close} onClick={close}>
          ×
        </a>
        <div className={style.header}>{content.name}</div>
        <div className={style.content}>
          <p>{content.contents}</p>
          <p><img className={style.cotentImage} src={content.tipImage} alt="" width={500} height={300}/></p>
        </div>
      </div>
    ) : (
      <div className={style.modal}>
        <label>
          Your old Password:
          <input require={true} type='text' value={oldPass} onChange={(e) => setOld(e.target.value)}></input>
        </label>
        <label>
          Your new Password:
          <input require={true} type='text' value={newPass} onChange={(e) => setnewPass(e.target.value)}></input>
        </label>
        <button type="submit" onSubmit={handleSubmit}>Change password</button>
        {cannotEmpty && <p style= {{color: 'red'}}> Please fill in the blank. </p>}
        {wrongPass && <p style= {{color: 'red'}}> Wrong usernamne or password. </p>}
        {changeSuccessful && <p style= {{color: 'green'}}> Wrong usernamne or password. </p>}
      </div>
    )
  );
};

export default Content;
