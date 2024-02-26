import React from "react";
import style from "@/styles/AdminHeader.module.css";
import {useAuth} from "@/contexts/AuthContext";
function AdminHeader() {
  const {adminLogout}= useAuth();
  const handleButton = async () => {
    adminLogout();
    window.location.href = "/";
  };
  return (
    <header className={style.headerStyle}>
      <div className={style.Hstyle}>
        <h3 className={style.textStyle}>Admin Dashboard</h3>
        <button onClick={handleButton} className={style.buttonStyle}>
          <a>Logout</a>
        </button>
      </div>
    </header>
  );
}

export default AdminHeader;
