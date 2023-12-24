'use client'
import Form from "react-bootstrap/Form";

import { useState } from "react";

const Curtain = ({ team, activeTeam }) => {
  const [isChecked, setIsChecked] = useState(false);
  const isActive = activeTeam === team.index;

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div>
      <Form className={`curtain-form ${isActive ? "" : "hidden"}`}>
        <Form.Check
          type="checkbox"
          id={`${team.index}`}
          className="check-curtain"
          onChange={handleCheckboxChange}
        />
        <label htmlFor={`${team.index}`}>
          <img src="/champCard/trophy.svg" className="icon-trophy" />
        </label>
      </Form>
      {isChecked && (
        <div className={`curtain ${isActive ? "" : "hidden"}`}>
          <h2>{team.name}</h2>
          <h3>{team.competition}</h3>
          <h3>{team.award}</h3>
        </div>
      )}
    </div>
  );
};

export default Curtain;
