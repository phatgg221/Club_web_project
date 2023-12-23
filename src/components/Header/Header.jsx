'use client'
import React, { useState } from 'react';
// import styles from '@/styles/Header.module.css'; 

// import { useState } from "react

function Header() {
  const [dataVisible, setDataVisible] = useState("false");

  return (
    <header class="primary-header">
      <div class="logo">
        <a href="#">
          <img src='./GFCC.png' width="50" height="46" />
        </a>
      </div>

      <button
        class="mobile-nav-toggle"
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

      <nav dataVisible={dataVisible} class="nav">
        <div class="nav-options">
          <ul class="left-nav">
            <li>
              <a className="about" href="index.html">
                About
              </a>
            </li>
            <li class="library">
              <a href="index.html">
                Library
                <img
                  class="drop-down-icon"
                  src='./dropdown.png'
                  alt="expand more"
                  width="18"
                  height="18"
                />
              </a>
              <ul class="drop-down">
                <a href="index.html">Competitions</a>
                <a href="index.html">Samples</a>
                <a href="index.html">Tips</a>
              </ul>
            </li>
          </ul>
          <ul class="right-nav">
            <li>
              <a className="booking" href="index.html">
                Booking
              </a>
            </li>
            <li>
              <a className="teams" href="index.html">
                Teams
              </a>
            </li>
            <button class="login-button">
              <a className="login-text" href="/userMain">
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