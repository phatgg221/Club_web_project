"use client";
import "@/styles/champ.module.css";
import CardName from "./cardName";
import { useState } from "react";
import TeamSlider from "./slider";
import Curtain from "./curtain";
import ChampTabs from "./champTabs";

// temporary data
const teamlist = [
  {
    name: "Team 1",
    competition: "Comp1",
    award: "First prize",
    images: ["test1.png", "test2.png"],
  },
  {
    name: "Team 2",
    competition: "Comp2",
    award: "Second prize",
    images: ["test3.png", "test4.png", "test5.png"],
  },
  {
    name: "Team 3",
    competition: "Comp2",
    award: "Second prize",
    images: ["test6.png", "test1.png", "test3.png"],
  },
  {
    name: "Team 4",
    competition: "Comp2",
    award: "Second prize",
    images: ["test7.png", "test8.png"],
  },
  {
    name: "Team 5",
    competition: "Comp2",
    award: "Second prize",
    images: [],
  },
];

export default function ChampionCard() {
  const [activeTeam, setActiveTeam] = useState(0);

  const handleClick = (team) => {
    setActiveTeam(team);
  };

  return (
    <div className="container">
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
  );
}
