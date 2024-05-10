import React, { useEffect, useState } from "react";
import AdminHeader from "../../../components/Header/adminHeader";
import style from "../../../styles/AdminDasboard.module.css";
import Popup from "reactjs-popup";
import { useRouter } from "next/router";
import { useAuth } from "../../../contexts/AuthContext";
import Content from "../../../components/Foldables/content";

function Dashboard() {
  const { isAdmin, isHighestAdmin } = useAuth();
  const [isClient, setIsClient] = useState(false);

  console.log("current login status" + isAdmin);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const router = useRouter();
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

  const handleTips = async () => {
    window.location.href = "/admin/tips/tips";
  };
  const handle = async () => {
    window.location.href = "/userMain";
  };
  useEffect(() => {
    if (!isAdmin) {
      router.push("/login");
      console.log("current admin " + isAdmin);
    }
  }, [isAdmin, router]);

  return (
    <div>
      <AdminHeader />
      <div className={style.container}>
        <button
          className={`${style.btn} ${style.btn1}`}
          onClick={handleCardButton}
        >
          Manage Competitions
        </button>
        <button className={`${style.btn}`} onClick={handleChampButton}>
          Manage Champion
        </button>
        <button className={`${style.btn} `} onClick={hanldeMember}>
          Manage Member
        </button>
        <button className={`${style.btn}`} onClick={handleSample}>
          Manage Sample
        </button>
        <button className={`${style.btn}`} onClick={handleTips}>
          Manage Tips
        </button>
        {!isHighestAdmin && isClient && (
          <button className={`${style.btn}`} onClick={handle}>
            Move to user dashboard
          </button>
        )}
        {isHighestAdmin && isClient && (
          <Popup
            modal
            trigger={
              <button className={`${style.btn}`}>Change Admin Password</button>
            }
          >
            {(close) => <Content close={close} isAdminChangePass={true} />}
          </Popup>
        )}
      </div>
    </div>
  );
}
Dashboard.hideLayout = true;
export default Dashboard;
