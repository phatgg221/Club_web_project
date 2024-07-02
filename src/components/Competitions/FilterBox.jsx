import React, { useState } from "react";
import "@/styles/FilterBox.module.css"

function FilterBox({ categories, name, onChange }) {
  const [checkedItems, setCheckedItems] = useState(
    new Array(categories.length).fill(false)
  );

  const handleCheckboxChange = (event,index) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    if(event.target.checked){
      onChange(categories[index]);
    }else{
      onChange('');
    }
    
    setCheckedItems(newCheckedItems);
  };

  return (
    <form className="filter-box">
      <span className="filter-box-title">{name}</span>
      <div className="btn-div">
        {categories.map((category, index) => (
          <label className="checkbox-lable" key={category}>
            <input
              type="checkbox"
              className="filter-box-checkbox"
              checked={checkedItems[index]}
              onChange={(event) => handleCheckboxChange(event, index)}
            />
            {category}
          </label>
        ))}
      </div>
    </form>
  );
}

export default FilterBox;
