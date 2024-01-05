import FoldableItem from "@/components/Foldables/FoldableItem";
import SearchBar from "@/components/Competitions/SearchBar.jsx";
import styles from "@/styles/Tips.module.css";
function TipsPage() {
  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.title}>Tips</h1>
      <SearchBar
        showButton={true}
        placeholder="Search for Competitions"
        style={{ width: "80%" }}
      />
      <FoldableItem title="Tip #1" />
      <FoldableItem title="Tip #2" />
      <FoldableItem title="Tip #3" />
      <FoldableItem title="Tip #4" />
    </div>
  );
}

export default TipsPage;
