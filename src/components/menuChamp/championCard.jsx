"use client";
import CardName from "./cardName";
import { useEffect, useState } from "react";
import TeamSlider from "./slider";
import Curtain from "./curtain";
import ChampTabs from "./champTabs";

export default function ChampionCard() {
  const [activeTeam, setActiveTeam] = useState(0);

  const [teamList, setTeamList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/champion_api');
        const data = await response.json();

        // Transform the data into the desired format
        let formattedData = data.data.mongoData.map((item, index) => ({
          name: item.teamName || "Name Not Available",
          competition: item.competitionDescription || "Description Not Available",
          award: item.awardDes || "Award Not Available",
          images: item.images || [], // Ensure images is an array, handle undefined case
          index,
          teamOrder: item.teamOrder || index, // Add teamOrder to each item
        }));

        // Sort the formattedData array by teamOrder
        formattedData = formattedData.sort((a, b) => a.teamOrder - b.teamOrder);

        // Fix teamList to 5 objects
        const fixedTeamList = Array.from({ length: 5 }, (_, index) => formattedData[index] || { name: "Empty" });

        setTeamList(fixedTeamList);
        console.log("teamList state:", teamList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  const handleClick = (team) => {
    setActiveTeam(team);
  };

  return (
    <main className="champCardMain">
      <div className="Champcontainer">
        <div className="champ-tabs">
          {teamList.map((team, index) => (
            <ChampTabs
              key={team.index}
              team={{ ...team }}
              activeTeam={activeTeam}
              handleClick={handleClick}
            />
          ))}
        </div>
        <div className="name-list">
          {teamList.map((team, index) => (
            <CardName
              key={index}
              team={{ ...team, index }}
              activeTeam={activeTeam}
              handleClick={handleClick}
            />
          ))}
        </div>
        <div className="slider">
          {teamList.map((team, index) => (
            <TeamSlider
              key={index}
              team={{ ...team, index }}
              activeTeam={activeTeam}
              images={team.images}
            />
          ))}

          {teamList.map((team, index) => (
            <Curtain
              key={index}
              team={{ ...team, index }} activeTeam={activeTeam} />
          ))}
        </div>
      </div>
    </main>
  );
}
