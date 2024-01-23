"use client";
// import "./champ.css";
import CardName from "./cardName";
import { useEffect,useState } from "react";
import TeamSlider from "./slider";
import Curtain from "./curtain";
import ChampTabs from "./champTabs";


// const teamlist = [
//   {
//     name: "ONEZ",
//     competition: "RMIT Business Analytics Champion",
//     award: "Champion",
//     images: ["rbacchampion.jpg"],
//   },
//   {
//     name: "Team 2",
//     competition: "RMIT Business Analytics Champion",
//     award: "Fourth Place",
//     images: ["rbac4th.jpg"],
//   },
//   {
//     name: "Team RMIT",
//     competition: "IIBD International Case Competition",
//     award: "Second Runner-up",
//     images: ["iibd.jpg"],
//   },
//   {
//     name: "Onyx Mustang",
//     competition: "Swin-Biz-Rockstar Season 3",
//     award: "Champion",
//     images: [
//       "swinbiz.jpg",
//       "swinbiz2.jpg",
//       "swinbiz3.jpg",
//       "swinbiz4.jpg",
//       "swinbiz5.jpg",
//     ],
//   },
//   // {
//   //   name: "Team 5",
//   //   competition: "Comp2",
//   //   award: "Second prize",
//   //   images: [],
//   // },
// ];

export default function ChampionCard() {
  const [activeTeam, setActiveTeam] = useState(0);

  const [teamList, setTeamList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/champion_api');
        const data = await response.json();

        // Transform the data into the desired format
        const formattedData = data.data.mongoData.map((item, index) => ({
          name: item.teamName,
          competition: item.competitionDescription,
          award: item.awardDes,
          images: item.image,
          index,
        }));

        setTeamList(formattedData);
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
              team={{ ...team, index }}
              activeTeam={activeTeam}
              handleClick={handleClick}
            />
          ))}
        </div>
        <div className="slider">
          {teamList.map((team, index) => (
            <TeamSlider
              team={{ ...team, index }}
              activeTeam={activeTeam}
              images={team.images}
            />
          ))}

          {teamList.map((team, index) => (
            <Curtain team={{ ...team, index }} activeTeam={activeTeam} />
          ))}
        </div>
      </div>
    </main>
  );
}
