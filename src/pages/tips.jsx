import FoldableItem from "../components/Foldables/FoldableItem";
import SearchBar from "../components/Competitions/SearchBar.jsx";
import styles from "../styles/Tips.module.css";
import { useEffect, useState } from "react";

function TipsPage() {
  const [tips, setTips] = useState([]);
  const isTip = true;
  useEffect(() => {
    let isTip = true;
    const fetchData = async () => {
      try {
        const response = await fetch("api/tip_api");
        const data = await response.json();
        setTips(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const [searchItem, setSearchItem] = useState("");

  const handleSearchInput = (searchItem) => {
    setSearchItem(searchItem);
  };

  const filteredTips =
    tips.data && tips.data.mongoData
      ? tips.data.mongoData.filter((item, index) => {
          return item.tipName
            .toLowerCase()
            .includes(searchItem.toLowerCase());
        })
      : [];

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.title}>Tips</h1>
      <SearchBar
        showButton={true}
        placeholder="Search for Competitions"
        style={{ width: "80%" }}
        onChange={handleSearchInput}
      />
      {filteredTips.map((item, index) => (
        <FoldableItem key={index} isTip={isTip} tips={item} />
      ))}
      {/* {tips &&
        tips.data &&
        tips.data.mongoData &&
        tips.data.mongoData.map((item, index) => (
          <FoldableItem key={index} isTip={isTip} tips={item} />
        ))} */}
      {/* <FoldableItem isTip={isTip} title="Tip #1" />
      <FoldableItem title="Tip #2" />
      <FoldableItem title="Tip #3" />
      <FoldableItem title="Tip #4" /> */}
    </div>
  );
}

export default TipsPage;
