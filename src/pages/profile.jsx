import dynamic from "next/dynamic";
import styles from "@/styles/Profile.module.css";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import Image from "next/image";
// Dynamically import the component with ssr: false

const ClientSideUsername = dynamic(
  () => import("@/components/ClientSideOnly.jsx"),
  { ssr: false }
);

export default function Profile() {
  // const { isLoggedIn, logout, username } = useAuth();
  const [changePw, setChangePw] = useState(false);

  const { isLoggedIn, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  function toggleChangePw() {
    window.location.href = "/resetPassword";
  }

  function toggleChangeEmail() {
    window.location.href = "/resetEmail";
  }

  function toggleAdmin() {
    window.location.href = "/admin/dashboard/view";
  }

  return (
    <div className={styles.container}>
      <Image
        alt=""
        className={styles.img}
        src="/HappyGFCC.png"
        width={100}
        height={117}
      />
      <ClientSideUsername /> {/* Render the client-side only component */}
      <button className={styles.btn} onClick={toggleChangeEmail}>
        Update your email
      </button>
      <button className={styles.btn} onClick={toggleChangePw}>
        Update your password
      </button>
      {isAdmin && (
        <button className={styles.btn} onClick={toggleAdmin}>
          Go to Admin Dashboard
        </button>
      )}
    </div>
  );
}
