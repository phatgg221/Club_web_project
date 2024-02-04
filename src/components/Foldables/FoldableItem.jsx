import styles from "@/styles/Foldable.module.css";
import React, { useState } from "react";
import Link from "next/link";
export default function FoldableItem({ title,year,author,link }) {
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
        <span>{year}</span>
          <span>{author}</span>
          <Link href={link}>Link</Link>
        </div>
      </div>
    </div>
  );
}
