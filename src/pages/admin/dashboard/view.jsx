import React from "react";
import AdminHeader from "@/components/Header/adminHeader";
import style from "@/styles/AdminDasboard.module.css";

function Dashboard() {
  const handleCardButton = async () => {
    window.location.href = "/admin/Card/view";
  };

  const handleChampButton = async () => {
    window.location.href = "/admin/champions/view";
  };
  const handleSample = async () => {
    window.location.href = "/admin/sample/view";
  };
  const hanldeMember = async () => {
    window.location.href = "/admin/member/view";
  };

  const handleTips= async () =>{
    window.location.href = "/admin/tips/tips";
  }
  return (
    <div>
      <AdminHeader />
      <div className={style.container}>
        <button
          className={`${style.btn} ${style.btn1}`}
          onClick={handleCardButton}
        >
          Manage Card
        </button>
        <button
          className={`${style.btn} ${style.btn2}`}
          onClick={handleChampButton}
        >
          Manage Champion
        </button>
        <button className={`${style.btn} ${style.btn3}`} onClick={hanldeMember}>
          Manage Member
        </button>
        <button className={`${style.btn} ${style.btn4}`} onClick={handleSample}>
          Manage Sample
        </button>
        <button onClick={handleTips}>Manage Tips</button>
      </div>
    </div>
  );
}
Dashboard.hideLayout = true;
export default Dashboard;
