import styles from "@/styles/Foldable.module.css";
import React, { useState } from "react";

export default function FoldableItem() {
  const [isFolded, setIsFolded] = useState(true);

  const handleToggleFold = () => {
    setIsFolded(!isFolded);
  };

  return (
    <div className={styles.item}>
      <div className={styles.innerContainer}>
        <h3 className={styles.title}>Sample</h3>
        <div className={styles.foldableContainer}>
          <button onClick={handleToggleFold} className={styles.foldButton}>
            {isFolded ? "Show" : "Hide"}
          </button>
        </div>
      </div>
      {!isFolded && (
        <div className={styles.contentContainer}>
          <p>hello</p>
        </div>
      )}
    </div>
  );
}
