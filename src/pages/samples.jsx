import FoldableItem from "@/components/Foldables/FoldableItem";
import SearchBar from "@/components/Competitions/SearchBar.jsx";
import styles from "@/styles/Samples.module.css";
import React from "react";
import { useEffect,useState } from "react";
function SamplesPage() {
  const [samples, setSamples] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const samplesResponse = await fetch("/api/sample_api");
        const samplesData = await samplesResponse.json();
        setSamples(samplesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // console.log(JSON.stringify(samples.data) + "aksdjhasdkjashdkasdahsdmv,navkadljj");
  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.title}>Samples</h1>
      <SearchBar
        showButton={true}
        placeholder="Search for Competitions"
        style={{ width: "80%" }}
      />
      {samples && samples.data && samples.data.mongoData && samples.data.mongoData.map((item,index) =>(
        <FoldableItem title={item.sampleName} key={index} year={item.sampleContents} link={item.sampleLink} author={item.sampleAuthor} />
      ))}

      {/* <FoldableItem title="Sample" />
      <FoldableItem title="Sample" />
      <FoldableItem title="Sample" />
      <FoldableItem title="Sample" /> */}
    </div>
  );
}

export default SamplesPage;
