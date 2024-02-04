//content.js
import React from "react";
import Image from "next/image";
import style from "@/styles/content.module.css"
export default ({ close, content }) => (
  <div className={style.modal}>
    <a className={style.close} onClick={close}>
      ×
    </a>
    <div className={style.header}> {content.name}</div>
    <div className={style.content}>
      {" "}
      
      <p>{content.contents}</p>
      <p><img  className={style.cotentImage} src={content.tipImage} alt="" width={500} height={300}/></p>

    </div>
  </div>
);
