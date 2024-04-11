import Booking from "../components/booking";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";
function BookingPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  return (
    <>
      <Booking />
    </>
  );
}

export default BookingPage;
