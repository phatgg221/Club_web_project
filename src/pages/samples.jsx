// src/pages/samples.jsx
import Foldable from "@/components/Foldables/Foldable";
import styles from "@/styles/Samples.module.css";
function SamplesPage() {
  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.title}>Samples</h1>
      <Foldable />
    </div>
  );
}

export default SamplesPage;
