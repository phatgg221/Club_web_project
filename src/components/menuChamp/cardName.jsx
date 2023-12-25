"use client";
// import "./champ.css";

const CardName = ({ team, activeTeam, handleClick }) => {
  const isActive = activeTeam == team.index;

  return (
    <button
      type="button"
      id={"i"+team.index}
      onClick={() => handleClick(team.index)}
      className={isActive ? "hidden-name card-name" : "card-name"}
    >
      {team.name}
    </button>
  );
};

export default CardName;