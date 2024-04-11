import SearchBar from "../components/Competitions/SearchBar.jsx";
import FilterBox from "../components/Competitions/FilterBox.jsx";
import { useState, useEffect } from "react";
import Image from "next/image";
export default function SearchPage() {
  const [dataVisible, setDataVisible] = useState("false");

  const [isDesktopOrLaptop, setIsDesktopOrLaptop] = useState(false);
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);
  const [samples, setSample] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const [selectedOrganizer, setselectedOrganizer] = useState('');
  const [searchForCompeittionStatus, setSearchForCompetitionStatus] = useState('');
  const handleResize = () => {
    setIsDesktopOrLaptop(window.matchMedia("(min-width: 490px)").matches);
    setIsTabletOrMobile(window.matchMedia("(max-width: 490px)").matches);
  };

  let categories = [];
  if (samples.data && samples.data.mongoData) {
    for (let i = 0; i <= samples.data.mongoData.length - 1; i++) {
      let item = samples.data.mongoData[i].organizer;

      // Check if the item is not already in the categories array
      if (!categories.includes(item)) {
        categories.push(item);
      }
    }
  }
  console.log(categories.length + " categories found.");

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSearchInput = (searchTerm) => {
    setSearchItem(searchTerm);
  };


  const handleSearchForStatus = (searchItem) => {
    setSearchForCompetitionStatus(searchItem);
  }
  const handleSearchForOrganizer = (searchItem) => {
    setselectedOrganizer(searchItem);
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/card_api`);
        const data = await response.json();
        setSample(data);
      } catch (error) {
        console.log('Error fetching data: ', error);
      }
    };
    fetchData();
  }, []);
  const renderSearchResults = () => {

    const filteredSamples = samples.data?.mongoData?.filter((item) => {
      const matchesSearch = !searchItem || item.competitionName.toLowerCase().includes(searchItem.toLowerCase());
      const matchesOrganizer = !selectedOrganizer || item.organizer.toLowerCase().includes(selectedOrganizer.toLowerCase());
      const matchesStatus = !searchForCompeittionStatus || item.competitionStatus?.toLowerCase() === searchForCompeittionStatus.toLowerCase();
      return matchesSearch && matchesOrganizer && matchesStatus;
    }) ?? [];


    // Map over the filtered samples to render them
    return filteredSamples.map((item, index) => (
      <div onClick={() => window.location.href = item.linkToWeb} key={index} className="sample-content">
        {item.competitionName} - {item.organizer}
      </div>
    ));
  };

  return (
    <div className="main-search">
      <h1>On-going Competitions</h1>
      <div className="search-container">
        <div className="search-bar-sect">
          <SearchBar showButton={true} placeholder="Search for Competitions" onChange={handleSearchInput} />
          <Image
            className="filter-icon"
            src="/dropdown.png"
            width="30"
            height="30"
            alt="picture"
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
                categories={categories}
                name={"By organizer"}
                onChange={handleSearchForOrganizer}
              />
              <FilterBox
                categories={[
                  "incoming",
                  "past"
                ]}
                name={"By Competition Status"}
                onChange={handleSearchForStatus}
              />
            </div>
            <div className="filter-sect-search">
              <SearchBar
                style={{ width: "100%" }}
                placeholder="Filter by Organizer"
                onChange={handleSearchForOrganizer}
              />
              {isDesktopOrLaptop && (
                <div className="competition-list">
                  {renderSearchResults()}
                </div>
              )}
            </div>
          </div>
        </div>
        {isTabletOrMobile && (
          <div className="competition-list">
            {renderSearchResults()}
          </div>
        )}
      </div>
    </div>
  );
}
