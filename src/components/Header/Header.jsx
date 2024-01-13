"use client";
import React, { useState } from "react";
// import styles from '@/styles/Header.module.css';

function Header() {
  const [dataVisible, setDataVisible] = useState("false");

  return (
    <header className="primary-header">
      <div className="logo">
        <a href="/userMain">
          <img src="./GFCC.png" width="50" height="46" />
        </a>
      </div>

      <button
        className="mobile-nav-toggle"
        onClick={() =>
          setDataVisible(dataVisible === "true" ? "false" : "true")
        }
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

      <nav datavisible={dataVisible} className="nav">
        <div className="nav-options">
          <ul className="left-nav">
            <li>
              <a id="about" href="/">
                About
              </a>
            </li>
            <li>
              <a id="samples" href="/samples">
                Showcase
              </a>
            </li>
            <li>
              <a id="tips" href="/tips">
                Tips
              </a>
            </li>
          </ul>
          <ul className="right-nav">
            <li>
              <a id="competitions" href="/competitions">
                Competitions
              </a>
            </li>
            <li>
              <a id="booking" href="/booking">
                Booking
              </a>
            </li>
            <button className="login-button">
              <a id="login-text" href="/userMain">
                Login
              </a>
            </button>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
