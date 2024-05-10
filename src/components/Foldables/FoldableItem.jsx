import styles from "@/styles/Foldable.module.css";
import React, { useState } from "react";
import Link from "next/link";
import Popup from "reactjs-popup";
import Content from "./content";
import style from "../../styles/content.module.css";
const FoldableItem = ({ title, year, author, link, isTip, tips }) => {
  // State for tracking fold/unfold state
  const [isFolded, setIsFolded] = useState(true);

  // Function to toggle fold/unfold state
  const handleToggleFold = () => {
    setIsFolded(!isFolded);
  };

  return (
    <div className={styles.item}>
      <div className={styles.innerContainer}>
        {/* Displaying title based on whether it's a tip or not */}
        <h3 className={styles.title}>{isTip ? tips.tipName : title}</h3>
        {isTip && tips.tipsLink && <Link href={tips.tipsLink}>Link</Link>}
        {/* Fold/Unfold button */}
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

      {/* Displaying additional content if it's not a tip */}
      {!isTip && (
        <div
          className={`${styles.contentContainer} ${
            isFolded ? styles.foldedContent : ""
          }`}
        >
          <div className={styles.content}>
            <span>{year}</span>
            <span>{author}</span>

            {/* Displaying link if available */}
            {link && <Link href={link}>Link</Link>}
          </div>
        </div>
      )}

      {isTip &&
        tips.realContent &&
        tips.realContent.map((content, index) => (
          <div
            key={index}
            className={`${styles.contentContainer} ${
              isFolded ? styles.foldedContent : ""
            }`}
          >
            <div className={styles.content}>
              <h4>{content.name}</h4>
              <Popup
                modal
                trigger={<button className={styles.foldButton}>View</button>}
              >
                {(close) => (
                  <Content
                    close={close}
                    className={style.modal}
                    content={content}
                  />
                )}
              </Popup>
            </div>
          </div>
        ))}

      {/* {isTip &&(
        <div
        className={`${styles.contentContainer} ${
          isFolded ? styles.foldedContent : ""
        }`}
      >
        <div className={styles.content}>
          <span></span>
          <span>{author}</span>

          
        </div>
      </div> 
      )} */}
    </div>
  );
};

export default FoldableItem;
