import dynamic from 'next/dynamic';
import styles from "@/styles/Profile.module.css";
import { useState,useEffect } from "react";
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
// Dynamically import the component with ssr: false
const ClientSideUsername = dynamic(() => import('@/components/ClientSideOnly.jsx'), { ssr: false });

export default function Profile() {
  // const { isLoggedIn, logout, username } = useAuth();
  const [changePw, setChangePw] = useState(false);

  const {isLoggedIn}= useAuth();
  const router = useRouter();

  useEffect(() =>{
    if(!isLoggedIn){
      router.push('/login');
    }
  }, [isLoggedIn,router]);

  

  function toggleChangePw() {
    window.location.href = "/resetPassword";
  }

  return (
    <div className={styles.container}>
      <img className={styles.img} src="/HappyGFCC.png" width="100px" />
      <ClientSideUsername /> {/* Render the client-side only component */}
      <p className={styles.p}>
        {/* Major: <span>Business Management</span> */}
      </p>
      <button className={styles.button} onClick={toggleChangePw}>
        Update your password
      </button>
    </div>
  );
}