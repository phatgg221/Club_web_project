import React, { useState } from "react";
// import "./SearchBar.css";

function SearchBar({ onChange,style, showButton, placeholder = "" }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    onChange(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Handle the search here
    console.log(`Searching for: ${query}`);
  };

  return (
    <form className="search-bar" style={style} onSubmit={handleFormSubmit}>
      <input
        className="text-box"
        type="search"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
      {showButton && <button className="submit-btn" type="submit"></button>}
    </form>
  );
}

export default SearchBar;
