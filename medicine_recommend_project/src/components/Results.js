import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedSymptoms } = location.state || { selectedSymptoms: [] };

  const handleSymptomClick = (symptom) => {
    navigate(`/medicine-info/${symptom}`);
  };

  return (
    <div>
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
    </div>
  );
}

export default Results;
