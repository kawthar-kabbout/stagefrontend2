import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Search.css';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = () => {
    if (searchTerm.trim() !== '') {
      navigate(`/shcategorie?query=${searchTerm}`);
    }
  };

  return (
    <div id="container">
      <input
        type="text"
        id="input"
        required
        placeholder="Type to search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={handleSearchSubmit}
      />
      <div id="icon" onClick={handleSearchSubmit}>
        <svg xmlns="http://www.w3.org/2000/svg" id="search-icon" viewBox="0 0 512 512">
          <title>Search</title>
          <path d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32"></path>
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M338.29 338.29L448 448"></path>
        </svg>
      </div>
    </div>
  );
};

export default Search;
