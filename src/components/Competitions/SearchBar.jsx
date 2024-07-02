import React, { useState } from "react";
import styles from "@/styles/SearchBar.module.css";

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
    <form className={styles.searchBar} style={style} onSubmit={handleFormSubmit}>
      <input
        className={styles.searchInput}
        type="search"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
      {showButton && (
        <button className={styles.submitBtn} type="submit">
        </button>  // Clearly label the button
      )}
    </form>
  );
}


export default SearchBar;
