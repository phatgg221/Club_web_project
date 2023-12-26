import React, { useState } from "react";
// import "./FilterBox.css";

function FilterBox({ categories, name }) {
  const [checkedItems, setCheckedItems] = useState(
    new Array(categories.length).fill(false)
  );

  const handleCheckboxChange = (index) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  return (
    <form className="filter-box">
      <span className="filter-box-title">{name}</span>
      <div className="btn-div">
        {categories.map((category, index) => (
          <label key={category}>
            <input
              type="checkbox"
              className="filter-box-checkbox"
              checked={checkedItems[index]}
              onChange={() => handleCheckboxChange(index)}
            />
            {category}
          </label>
        ))}
      </div>
    </form>
  );
}

export default FilterBox;
