import React from "react";
import Hero from "@/components/Hero";
import ChampionCard from "./menuChamp/championCard";
import Cards from "@/components/cardHover/Cards"
function userMain() {
    return (
      <>
          <Hero></Hero>
          {/* <ChampionCard></ChampionCard> */}
          <Cards></Cards>
      </>
    );
  }
  
  export default userMain;
  