import FoldableItem from "@/components/Foldables/FoldableItem";
import SearchBar from "@/components/Competitions/SearchBar.jsx";
import styles from "@/styles/Samples.module.css";
function SamplesPage() {
  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.title}>Showcase</h1>
      <SearchBar
        showButton={true}
        placeholder="Search for Competitions"
        style={{ width: "80%" }}
      />
      <FoldableItem title="Sample" />
      <FoldableItem title="Sample" />
      <FoldableItem title="Sample" />
      <FoldableItem title="Sample" />
    </div>
  );
}

export default SamplesPage;
