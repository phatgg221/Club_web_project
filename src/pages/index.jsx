// src/pages/index.jsx
import Welcome from "../components/Welcome";
import ChampionCard from "../components/menuChamp/championCard";
function Home() {
  return (
    <>
      <Welcome />
      <br /> <br />
      <ChampionCard />
      <br /> <br />
    </>
  );
}

export default Home;
