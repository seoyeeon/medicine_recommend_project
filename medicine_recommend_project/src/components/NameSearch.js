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
        <Link to="/">
          <img src="logo1.png" className="App-logo" alt="logo" />
        </Link>
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
          {/* 버튼을 이미지로 대체 */}
          <img
            src="search-icon.png"  /* 원하는 이미지 파일 경로로 변경 */
            alt="검색"
            className="search-button-image"
            onClick={handleSearch}
            style={{ cursor: 'pointer' }}  /* 클릭 가능한 상태로 만들기 위해 커서 스타일 추가 */
          />
        </form>
        <div className="button-group">
          <button onClick={() => handleButtonClick('medicine1')} className="nav-button">
            <img src="Tylenol.jpg" alt="Tylenol" className="button-image" />
            타이레놀
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
