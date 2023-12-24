'use client'
import React, { useState } from 'react';
// import styles from '@/styles/Header.module.css'; 

// import { useState } from "react

function Header() {
  const [dataVisible, setDataVisible] = useState("false");

  return (
    <header className="MyApp__primary-header">
      <div className="MyApp__logo">
        <a href="/">
          <img src='./GFCC.png' width="50" height="46" />
        </a>
      </div>

      <button
        className="MyApp__mobile-nav-toggle"
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

      <nav dataVisible={dataVisible} className="MyApp__nav">
        <div className="MyApp__nav-options">
          <ul className="MyApp__left-nav">
            <li>
              <a className="MyApp__about" href="index.html">
                About
              </a>
            </li>
            <li className="MyApp__library">
              <a href="index.html">
                Library
                <img
                  className="MyApp__drop-down-icon"
                  src='./dropdown.png'
                  alt="expand more"
                  width="18"
                  height="18"
                />
              </a>
              <ul className="MyApp__drop-down">
                <a href="index.html">Competitions</a>
                <a href="index.html">Samples</a>
                <a href="index.html">Tips</a>
              </ul>
            </li>
          </ul>
          <ul className="MyApp__right-nav">
            <li>
              <a className="MyApp__booking" href="index.html">
                Booking
              </a>
            </li>
            <li>
              <a className="MyApp__teams" href="index.html">
                Teams
              </a>
            </li>
            <button className="MyApp__login-button">
              <a className="MyApp__login-text" href="/userMain">
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
