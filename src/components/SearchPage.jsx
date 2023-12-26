import SearchBar from "@/components/Competitions/SearchBar.jsx";
import FilterBox from "@/components/Competitions/FilterBox.jsx";
// import "./SearchPage.css";
import { useState } from "react";

export default function SearchPage() {
  const [dataVisible, setDataVisible] = useState("false");

  return (
    <div className="search-container">
      <h1>On-going Competitions</h1>
      <div className="search-bar-sect">
        <SearchBar showButton={true} placeholder="Search for Competitions" />
        <img
          className="filter-icon"
          src="./dropdown.png"
          width="30"
          height="30"
          onClick={() =>
            setDataVisible(dataVisible === "true" ? "false" : "true")
          }
        />
      </div>
      <div dataVisible={dataVisible} className="filter-sect">
        <div className="filter-sect-title">
          <h2>Filters</h2>
          <span>clear all filters</span>
        </div>
        <div className="filter-sect-container">
          <div className="filter-sect-boxes">
            <FilterBox
              categories={["Category1", "Category2", "Category3"]}
              name={"By type"}
            />
            <FilterBox
              categories={["Category1", "Category2", "Category3", "Category4"]}
              name={"By category"}
            />
          </div>
          <div className="filter-sect-search">
            <SearchBar
              style={{ width: "100%" }}
              placeholder="Filter by Organizer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
