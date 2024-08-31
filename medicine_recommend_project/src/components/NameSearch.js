import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NameSearch.css';

function NameSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search-results?query=${searchTerm}`);
  };

  const handleButtonClick = (medicineName) => {
    navigate(`/medicine-info/${medicineName}`);
  };

  return (
    <div className="name-search-container">
      <header className="name-search-header">
        <Link to="/" className="home-button">Home</Link>
      </header>
      <main className="name-search-main">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="약 이름을 입력하세요..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-button">검색</button>
        </form>
        <div className="button-group">
          <button onClick={() => handleButtonClick('medicine1')} className="nav-button">
            <img src="image1-url.jpg" alt="medicine 1" className="button-image" />
            약 1
          </button>
          <button onClick={() => handleButtonClick('medicine2')} className="nav-button">
            <img src="image2-url.jpg" alt="medicine 2" className="button-image" />
            약 2
          </button>
          <button onClick={() => handleButtonClick('medicine3')} className="nav-button">
            <img src="image3-url.jpg" alt="medicine 3" className="button-image" />
            약 3
          </button>
        </div>
      </main>
    </div>
  );
}

export default NameSearch;
