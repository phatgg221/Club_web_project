import Form from "react-bootstrap/Form";
import { useState } from "react";

const Curtain = ({ team, activeTeam }) => {
  const [isClicked, setClicked] = useState("false");
  const isActive = activeTeam === team.index;

  return (
    <div>
      <Form className={`curtain-form ${isActive ? "" : "hidden"}`}>
        <img htmlFor={`${team.index}`} src="/trophy.svg" className="icon-trophy" onClick={() => setClicked(isClicked === "true" ? "false" : "true")}/>
      </Form>
      <div clicked={isClicked} className={`curtain ${isActive ? "" : "hidden"}`}>
        <h2>{team.name}</h2>
        <h3>{team.competition}</h3>
        <h3>{team.award}</h3>
      </div>
    </div>
  );
};

export default Curtain;