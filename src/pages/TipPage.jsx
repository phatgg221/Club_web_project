// src/pages/index.jsx
import Tips from "../components/Tips"
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";
// import Welcome from '@/components/Welcome';
function TipPage(props) {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);
  return (
    <Tips />
  )
}

export default TipPage;