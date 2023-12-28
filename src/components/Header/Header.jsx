"use client";
import React, { useState } from "react";
// import styles from '@/styles/Header.module.css';

// import { useState } from "react

function Header() {
  const [dataVisible, setDataVisible] = useState("false");

  return (
    <header className="primary-header">
      <div className="logo">
        <a href="#">
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
            stroke-width="2.5"
            stroke-linecap="round"
          />
          <path
            d="M4 12L20 12"
            stroke="#f8a61b"
            stroke-width="2.5"
            stroke-linecap="round"
          />
          <path
            d="M4 6L20 6"
            stroke="#f8a61b"
            stroke-width="2.5"
            stroke-linecap="round"
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
            <li className="library">
              <a id="library">
                Library
                <img
                  className="drop-down-icon"
                  src="./dropdown.png"
                  alt="expand more"
                  width="18"
                  height="18"
                />
              </a>
              <ul className="drop-down">
                <a href="/competitions">Competitions</a>
                <a href="index.html">Samples</a>
                <a href="index.html">Tips</a>
              </ul>
            </li>
          </ul>
          <ul className="right-nav">
            <li>
              <a id="booking" href="/booking">
                Booking
              </a>
            </li>
            <li>
              <a id="teams" href="index.html">
                Teams
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