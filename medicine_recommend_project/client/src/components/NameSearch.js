import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './NameSearch.css';

function NameSearch() {
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
  const [medicines, setMedicines] = useState([]); // 검색 결과 상태
  const [searched, setSearched] = useState(false); // 검색 수행 여부 상태
  const navigate = useNavigate();

  // 검색 함수
  const handleSearch = async (searchQuery) => {
    const query = searchQuery || searchTerm; // 버튼 클릭 시 검색어 사용
    console.log('검색어:', query); // 검색어 로그

    try {
      const response = await axios.get(`/api/medicines?query=${encodeURIComponent(query)}`);
      setMedicines(response.data); // 검색 결과 저장
      setSearched(true); // 검색 수행 여부 업데이트
      console.log('검색 결과:', response.data);
    } catch (err) {
      console.error('API 호출 오류:', err);
    }
  };

  // 버튼 클릭 시 검색 수행
  const handleButtonClick = (medicineName) => {
    setSearchTerm(medicineName); // 선택한 약 이름을 검색어로 설정
    handleSearch(medicineName); // 해당 약 이름으로 검색 수행
  };

  // 검색어가 바뀔 때 상태 초기화 (검색 전 상태로)
  useEffect(() => {
    if (searchTerm === '') {
      setSearched(false); // 검색어가 초기화되면 검색 수행 여부도 초기화
    }
  }, [searchTerm]);

  return (
    <div className="name-search-container">
      <header className="name-search-header">
        <Link to="/">
          <img src="logo1.png" className="App-logo" alt="logo" />
        </Link>
      </header>
      <main className="name-search-main">
        {/* 검색 입력 폼 */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(); // 입력된 검색어로 검색 수행
          }}
        >
          <input
            type="text"
            placeholder="약 이름을 입력하세요..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img
            src="search-icon.png"
            alt="검색"
            className="search-button-image"
            onClick={() => handleSearch()} // 검색 아이콘 클릭 시 검색 수행
            style={{ cursor: 'pointer' }}
          />
        </form>

        {/* 검색 전 버튼들 (searched가 false일 때만 표시) */}
        {!searched && (
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
        )}

        {/* 검색 결과 표시 */}
        <div className="results-container">
          {medicines.length > 0 ? (
            <ul>
              {medicines.map((medicine) => (
                <li key={medicine.id} onClick={() => navigate(`/MedicineInfo/${medicine.Medicine_Name}`)}>
                  <h3>{medicine.Medicine_Name}</h3>
                  <p>Main Ingredients: {medicine.Main_Ingredients}</p>
                  <p>Effects: {medicine.Effects}</p>
                  <p>Dosage: {medicine.Dosage_by_Age}</p>
                  <img src={medicine.Image_Path} alt={medicine.Medicine_Name} />
                </li>
              ))}
            </ul>
          ) : (
            searched && <p>검색 결과가 없습니다.</p> // 검색 수행 후 결과 없음 메시지 표시
          )}
        </div>
      </main>
    </div>
  );
}

export default NameSearch;
