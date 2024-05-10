"use client";
import { useEffect, useState } from "react";
import Curtain from "./curtain";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";

export default function ChampionCard() {
  const [activeTeam, setActiveTeam] = useState(0);
  const [teamList, setTeamList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/champion_api");
        const data = await response.json();

        let formattedData = data.data.mongoData.map((item, index) => ({
          name: item.teamName || "Name Not Available",
          competition:
            item.competitionDescription || "Description Not Available",
          award: item.awardDes || "Award Not Available",
          image: item.image || "/champ-bg.png",
          images: item.images || [],
          index,
        }));

        setTeamList(formattedData);
        console.log("teamList state:", teamList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [teamList]);

  useEffect(() => {
    setActiveTeam(activeIndex);
  }, [activeIndex]);

  return (
    <main className="champCardMain">
      <div className="Champcontainer">
        <div className="slider">
          <Carousel
            className="carousel"
            onSlide={(slideIndex) => setActiveIndex(slideIndex)}
          >
            {teamList.map((team, index) => (
              <Carousel.Item id={index} key={index} className="carousel-item">
                <Image
                  className="carousel-img"
                  src={team.images[0]}
                  alt={"image-${index}"}
                  fluid
                />
              </Carousel.Item>
            ))}
          </Carousel>

          {teamList.map((team, index) => (
            <Curtain key={index} team={{ ...team }} activeTeam={activeTeam} />
          ))}
        </div>
      </div>
    </main>
  );
}
