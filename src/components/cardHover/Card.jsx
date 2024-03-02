"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
// import "./Card.css";

const Card = ({ logoURL, organizer, title, description, imageUrl, linkUrl }) => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const card = document.getElementById("cardContent");
    if (card) {
      setShowScroll(card.scrollHeight > card.clientHeight);
    }
  }, [description]);

  return (
    <div className="card-item">
      <Link href={linkUrl} className="card-link"></Link>
      <div className="card-content" id="cardContent">
        <span>
          <Image width={32} height={32} src={logoURL} alt="" />
          {organizer}
        </span>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      {showScroll && <div className="scroll-indicator">Tag</div>}
      <div
        className="card-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
    </div>
  );
};

export default Card;
