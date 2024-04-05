import React, { useEffect } from "react";
import DraftingComponents from "../components/DraftingComponents";
import { useRouter } from 'next/router';
import { useAuth } from "../contexts/AuthContext";
function UserMain() {
  const router = useRouter();
  const { id } = router.query;
  const { isLoggedIn } = useAuth();
  // console.log("id asdasdasd"+ id);
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  return (
    <>
      <DraftingComponents userId={id} />
    </>
  );
}

export default UserMain;
