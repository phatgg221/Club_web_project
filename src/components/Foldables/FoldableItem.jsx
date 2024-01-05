import styles from "@/styles/Foldable.module.css";
import React, { useState } from "react";

export default function FoldableItem({ title }) {
  const [isFolded, setIsFolded] = useState(true);

  const handleToggleFold = () => {
    setIsFolded(!isFolded);
  };

  return (
    <div className={styles.item}>
      <div className={styles.innerContainer}>
        <h3 className={styles.title}>{title}</h3>
        <div
          className={`${styles.foldableContainer} ${
            isFolded ? styles.folded : ""
          }`}
        >
          <button onClick={handleToggleFold} className={styles.foldButton}>
            {isFolded ? "Show" : "Hide"}
          </button>
        </div>
      </div>
      <div
        className={`${styles.contentContainer} ${
          isFolded ? styles.foldedContent : ""
        }`}
      >
        <div className={styles.content}>
          <span>Year</span>
          <span>Rank</span>
          <span>Team/Author</span>
          <a href="#">Link</a>
        </div>
      </div>
    </div>
  );
}
