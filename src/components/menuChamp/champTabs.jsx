function ChampTabs({ team, activeTeam, handleClick }) {
  const isActive = activeTeam == team.index;

  return (
    <button
      type="button"
      id={"i"+team.index}
      onClick={() => handleClick(team.index)}
      className={isActive ? "hidden-name card-name" : "card-name"}
    >
      {team.index + 1}
    </button>
  );
}

export default ChampTabs;