import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";

const TeamSlider = ({ images, team, activeTeam }) => {
  const isActive = activeTeam === team.index;
  const isImagesEmpty = images.length === 0;

  return (
    <Carousel className={isActive ? "carousel" : "hidden carousel"}>
      {isImagesEmpty ? (
        <Carousel.Item className="carousel-item">
          <Image className="carousel-img" src="/champ-bg.png" fluid />
        </Carousel.Item>
      ) : (
        images.map((image) => (
          <Carousel.Item className="carousel-item">
            <Image className="carousel-img" src={`/${image}`} fluid />
          </Carousel.Item>
        ))
      )}
    </Carousel>
  );
};

export default TeamSlider;