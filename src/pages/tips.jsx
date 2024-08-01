import FoldableItem from "../components/Foldables/FoldableItem";
import SearchBar from "../components/Competitions/SearchBar.jsx";
import styles from "../styles/Tips.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";
function TipsPage() {
  
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

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
      <h1 className={styles.title}>Sharing Tips</h1>
      <SearchBar
        showButton={true}
        placeholder="Search for Tips"
        style={{ width: "80%" }}
        onChange={handleSearchInput}
      />
      {filteredTips.map((item, index) => (
        <FoldableItem key={index} isTip={isTip} tips={item} />
      ))}
    </div>
  );
}

export default TipsPage;
