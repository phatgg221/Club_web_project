import React from "react";
import style from "@/styles/AdminHeader.module.css";

function AdminHeader() {
  const handleButton = async () => {
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
