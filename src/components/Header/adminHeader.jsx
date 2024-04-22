import React from "react";
import style from "../../styles/AdminHeader.module.css";
import { useAuth } from "../../contexts/AuthContext";
import Link from "next/link";
function AdminHeader() {
  const { adminLogout, logout } = useAuth();
  const handleButton = async () => {
    adminLogout();
    logout();
    window.location.href = "/";
  };
  return (
    <header className={style.headerStyle}>
      <div className={style.Hstyle}>
        <h3 className={style.textStyle}>Admin Dashboard</h3>
        <button onClick={handleButton} className={style.buttonStyle}>
          <p className={style.buttonTextStyle}>Logout</p>
        </button>
      </div>
    </header>
  );
}

export default AdminHeader;
