"use client";
import React, { useState, useEffect } from "react";
// import "./Card.css";

const Card = ({ logo, organizer, title, description, imageUrl, linkUrl }) => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const card = document.getElementById("cardContent");
    if (card) {
      setShowScroll(card.scrollHeight > card.clientHeight);
    }
  }, [description]);

  return (
    <div className="card-item">
      <a href={linkUrl} className="card-link"></a>
      <div className="card-content" id="cardContent">
        <span>
          <img src={logo} />
          {organizer}
        </span>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      {showScroll && <div className="scroll-indicator">Scroll</div>}
      <div
        className="card-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
    </div>
  );
};

export default Card;