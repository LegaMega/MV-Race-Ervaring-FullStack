import React from 'react';

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="schrijf een naam van de klant"
        value={value}
        onChange={onChange}
        aria-label="Search customer name"
      />
      <button className="search-button" aria-label="Search">
        <svg width="20" height="20" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="9" r="7" />
          <line x1="16" y1="16" x2="20" y2="20" />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
