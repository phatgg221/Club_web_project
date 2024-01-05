// src/pages/samples.jsx
import Foldable from "@/components/Foldables/Foldable";
import styles from "@/styles/Tips.module.css";
function TipsPage() {
  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.title}>Tips</h1>
      <Foldable />
    </div>
  );
}

export default TipsPage;
