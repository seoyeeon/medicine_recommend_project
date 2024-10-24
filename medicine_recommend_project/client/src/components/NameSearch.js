import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Axios 임포트
import './NameSearch.css';

function NameSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [medicines, setMedicines] = useState([]); // 검색 결과 상태 추가
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log('검색어:', searchTerm);  // 검색어가 제대로 설정되었는지 확인

    try {
      const response = await axios.get(`/api/medicines?query=${encodeURIComponent(searchTerm)}`);
      setMedicines(response.data); // 검색 결과 저장
    } catch (err) {
      console.error('API 호출 오류:', err);
    }
  };

  const handleButtonClick = (medicineName) => {
    navigate(`/MedicineInfo/${medicineName}`); // 약 이름 클릭 시 해당 페이지로 이동
    //console.log(medicine.Image_Path);
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
          <img
            src="search-icon.png"  // 원하는 이미지 파일 경로로 변경
            alt="검색"
            className="search-button-image"
            onClick={handleSearch}
            style={{ cursor: 'pointer' }} // 클릭 가능한 상태로 만들기 위해 커서 스타일 추가
          />
        </form>
        <div className="fixed-buttons">
          <button onClick={() => handleButtonClick('타이레놀')} className="nav-button">
            <img src="Tylenol.jpg" alt="Tylenol" className="button-image" />
            타이레놀
          </button>
          <button onClick={() => handleButtonClick('게보린')} className="nav-button">
            <img src="geborin.jpeg" alt="게보린" className="button-image" />
            게보린
          </button>
          <button onClick={() => handleButtonClick('부루펜')} className="nav-button">
            <img src="brufen.jpg" alt="부루펜" className="button-image" />
            부루펜
          </button>
        </div>
        <div className="results-container">
          {medicines.length > 0 ? (
            <ul>
              {medicines.map(medicine => (
                <li key={medicine.id} onClick={() => handleButtonClick(medicine.Medicine_Name)}>
                  <h3>{medicine.Medicine_Name}</h3>
                  <p>Main Ingredients: {medicine.Main_Ingredients}</p>
                  <p>Effects: {medicine.Effects}</p>
                  <p>Dosage: {medicine.Dosage_by_Age}</p>
                  <img src={medicine.Image_Path} alt={medicine.Medicine_Name} />
                </li>
              ))}
            </ul>
          ) : (
            <p>검색 결과가 없습니다.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default NameSearch;
