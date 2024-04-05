import styles from "../styles/Tips.module.css";

function Tips(props) {
  return (
    <div className={styles.main}>
      <h1 className={styles.heading}>Tip for something</h1>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Title</h1>
        </div>
        <div className={styles.bodyContainer}>
          <h1 className={styles.contentText}>Contents</h1>
          <div className={styles.bottomContainer}>
            <button className={styles.btn}>Button</button>
            <text className={styles.attachFile}>Attach File</text>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tips;
