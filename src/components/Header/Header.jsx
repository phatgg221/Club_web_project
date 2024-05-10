"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Link from "next/link";
import Image from "next/image";
function Header() {
  const [dataVisible, setDataVisible] = useState(false);
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    if (isLoggedIn) {
      logout();
      window.location.href = "/";
    } else {
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    console.log("Current login status: ", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <header className="primary-header">
      <div className="logo">
        <Link href={isLoggedIn ? "/userMain" : "/login"}>
          <Image src="/GFCC.png" width="50" height="46" alt="" />
        </Link>
      </div>

      <button
        className="mobile-nav-toggle"
        onClick={() => setDataVisible(!dataVisible)}
      >
        <svg
          width="25px"
          height="25px"
          viewBox="30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 18L20 18"
            stroke="#f8a61b"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M4 12L20 12"
            stroke="#f8a61b"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M4 6L20 6"
            stroke="#f8a61b"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <nav datavisible={dataVisible.toString()} className="nav">
        <div className="nav-options">
          <ul className="left-nav">
            <li>
              <Link id="about" href="/">
                About
              </Link>
            </li>
            <li>
              <Link id="samples" href="/samples">
                Showcase
              </Link>
            </li>

            <li>
              <Link
                id="competitions"
                href={isLoggedIn ? "/competitions" : "/login"}
              >
                Competitions
              </Link>
            </li>
          </ul>
          <ul className="right-nav">
            <li>
              <Link id="tips" href={isLoggedIn ? "/tips" : "/login"}>
                Tips
              </Link>
            </li>

            <li>
              <Link id="booking" href={isLoggedIn ? "/booking" : "/login"}>
                Booking
              </Link>
            </li>

            {isLoggedIn && (
              <li>
                <Link id="booking" href={"/profile"}>
                  Profile
                </Link>
              </li>
            )}

            <li>
              <button className="login-button">
                <Link href="" id="login-text" onClick={handleLogout}>
                  {isLoggedIn ? "Logout" : "Login"}
                </Link>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
