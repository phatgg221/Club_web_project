"use client";
// import "./champ.css";
import CardName from "./cardName";
import { useState } from "react";
import TeamSlider from "./slider";
import Curtain from "./curtain";
import ChampTabs from "./champTabs";

// temporary data
const teamlist = [
  {
    name: "ONEZ",
    competition: "RMIT Business Analytics Champion",
    award: "Champion",
    images: ["rbacchampion.jpg"],
  },
  {
    name: "Team 2",
    competition: "RMIT Business Analytics Champion",
    award: "Fourth Place",
    images: ["rbac4th.jpg"],
  },
  {
    name: "Team RMIT",
    competition: "IIBD International Case Competition",
    award: "Second Runner-up",
    images: ["iibd.jpg"],
  },
  {
    name: "Onyx Mustang",
    competition: "Swin-Biz-Rockstar Season 3",
    award: "Champion",
    images: [
      "swinbiz.jpg",
      "swinbiz2.jpg",
      "swinbiz3.jpg",
      "swinbiz4.jpg",
      "swinbiz5.jpg",
    ],
  },
  // {
  //   name: "Team 5",
  //   competition: "Comp2",
  //   award: "Second prize",
  //   images: [],
  // },
];

export default function ChampionCard() {
  const [activeTeam, setActiveTeam] = useState(0);

  const handleClick = (team) => {
    setActiveTeam(team);
  };

  return (
    <main className="champCardMain">
      <div className="Champcontainer">
        <div className="champ-tabs">
          {teamlist.map((team, index) => (
            <ChampTabs
              team={{ ...team, index }}
              activeTeam={activeTeam}
              handleClick={handleClick}
            />
          ))}
        </div>
        <div className="name-list">
          {teamlist.map((team, index) => (
            <CardName
              team={{ ...team, index }}
              activeTeam={activeTeam}
              handleClick={handleClick}
            />
          ))}
        </div>
        <div className="slider">
          {teamlist.map((team, index) => (
            <TeamSlider
              team={{ ...team, index }}
              activeTeam={activeTeam}
              images={team.images}
            />
          ))}

          {teamlist.map((team, index) => (
            <Curtain team={{ ...team, index }} activeTeam={activeTeam} />
          ))}
        </div>
      </div>
    </main>
  );
}
