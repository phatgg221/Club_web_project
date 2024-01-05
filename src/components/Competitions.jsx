import SearchBar from "@/components/Competitions/SearchBar.jsx";
import FilterBox from "@/components/Competitions/FilterBox.jsx";
import { useState, useEffect } from "react";

export default function SearchPage() {
  const [dataVisible, setDataVisible] = useState("false");

  const [isDesktopOrLaptop, setIsDesktopOrLaptop] = useState(false);
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);

  const handleResize = () => {
    setIsDesktopOrLaptop(window.matchMedia("(min-width: 490px)").matches);
    setIsTabletOrMobile(window.matchMedia("(max-width: 490px)").matches);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="main-search">
      <h1>On-going Competitions</h1>
      <div className="search-container">
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
        <div datavisible={dataVisible} className="filter-sect">
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
                categories={[
                  "Category1",
                  "Category2",
                  "Category3",
                  "Category4",
                ]}
                name={"By category"}
              />
            </div>
            <div className="filter-sect-search">
              <SearchBar
                style={{ width: "100%" }}
                placeholder="Filter by Organizer"
              />
              {isDesktopOrLaptop && (
                <>
                  <div className="competition-list">
                    <div className="sample-content">sample</div>
                    <div className="sample-content">sample</div>
                    <div className="sample-content">sample</div>
                    <div className="sample-content">sample</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {isTabletOrMobile && (
          <>
            <div className="competition-list">
              <div className="sample-content">sample</div>
              <div className="sample-content">sample</div>
              <div className="sample-content">sample</div>
              <div className="sample-content">sample</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
