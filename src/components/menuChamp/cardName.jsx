"use client";
import styles from "@/styles/champ.module.css";

const CardName = ({ team, activeTeam, handleClick }) => {
  const isActive = activeTeam == team.index;

  return (
    <button
      type="button"
      id={team.index}
      onClick={() => handleClick(team.index)}
      className={isActive ? "hidden-name card-name" : "card-name"}
    >
      {team.name}
    </button>
  );
};

export default CardName;
