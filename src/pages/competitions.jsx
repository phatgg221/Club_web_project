// src/pages/competitions.jsx
import Comp from "../components/Competitions";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";
function CompetitionsPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  return (
    <>
      <Comp />
    </>
  );
}

export default CompetitionsPage;
