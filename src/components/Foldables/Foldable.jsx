import styles from "@/styles/Foldable.module.css";
import FoldableItem from "@/components/Foldables/FoldableItem";

export default function Foldable() {
  return (
    <div className={styles.mainContainer}>
      <FoldableItem />
      <FoldableItem />
      <FoldableItem />
      <FoldableItem />
    </div>
  );
}
