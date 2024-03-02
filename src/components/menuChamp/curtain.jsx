import Form from "react-bootstrap/Form";
import { useState } from "react";
import Image from "next/image";
const Curtain = ({ team, activeTeam }) => {
  const [isClicked, setClicked] = useState("false");
  const isActive = activeTeam === team.index;

  return (
    <div>
      <Form className={`curtain-form ${isActive ? "" : "hidden"}`}>
        <Image alt="" width={100} height={100} htmlFor={`${team.index}`} src="/trophy.svg" className="icon-trophy" onClick={() => setClicked(isClicked === "true" ? "false" : "true")} />
      </Form>
      <div clicked={isClicked} className={`curtain ${isActive ? "" : "hidden"}`}>
        <div className="content">
          <h2>{team.name}</h2>
          <h3>{team.competition}</h3>
          <h3>{team.award}</h3>
        </div>
      </div>
    </div>
  );
};

export default Curtain;