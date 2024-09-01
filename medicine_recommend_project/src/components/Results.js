import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './Results.css'; // CSS 파일을 추가로 임포트합니다.

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedSymptoms } = location.state || { selectedSymptoms: [] };

  const handleSymptomClick = (symptom) => {
    navigate(`/medicine-info/${symptom}`);
  };

  return (
    <div className="results-container">
      <header className="results-header">
        <img src="logo1.png" className="App-logo" alt="logo" />
        <Link to="/" className="home-button">Home</Link>
      </header>
      <main className="results-main">
        <h2>선택한 증상으로 검색한 결과입니다:</h2>
        <ul>
          {selectedSymptoms.map((symptom, index) => (
            <li
              key={index}
              style={{ cursor: 'pointer', listStyleType: 'none', padding: '10px', borderBottom: '1px solid #ccc' }}
              onClick={() => handleSymptomClick(symptom)}
            >
              {symptom}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default Results;
