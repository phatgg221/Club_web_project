import React from "react";
import DraftingComponents from "@/components/DraftingComponents";
import { useRouter } from 'next/router';
function userMain() {
    const router = useRouter();
    const { id } = router.query;
    // console.log("id asdasdasd"+ id);
  return (
    <>
      <DraftingComponents userId={id}/>
    </>
  );
}

export default userMain;
