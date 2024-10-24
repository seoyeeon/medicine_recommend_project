import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SymptomsCheck.css';

function SymptomsCheck() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const navigate = useNavigate();

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedSymptoms([...selectedSymptoms, value]);
    } else {
      setSelectedSymptoms(selectedSymptoms.filter(symptom => symptom !== value));
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/medicines/symptoms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms: selectedSymptoms }),
      });

      if (response.ok) {
        const data = await response.json();
        navigate('/results', { state: { data } }); // 결과 페이지로 데이터 전달
      } else {
        throw new Error('데이터를 불러오는 데 실패했습니다.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="symptoms-check-container">
      <header className="symptoms-check-header">
        <Link to="/">
          <img src="/logo1.png" className="App-logo" alt="logo" />
        </Link>
      </header>
      <main className="symptoms-check-main">
        <h2 className="symptoms-title">어디가 불편하신가요?</h2>
        <div className="checkbox-group">
          {['해열', '진통', '소염', '소화불량', '알레르기', '변비', '근육통', '구충제', '기침', '피로', '구강', '피부', '뼈'].map((symptom, index) => (
            <label
              key={symptom}
              className={`checkbox-container ${selectedSymptoms.includes(symptom) ? 'checked' : ''}`}
              htmlFor={`checkbox-${index}`} // 각 체크박스에 고유한 ID 추가
            >
              <input
                type="checkbox"
                id={`checkbox-${index}`}
                value={symptom}
                onChange={handleCheckboxChange}
              />
              {symptom}
            </label>
          ))}
        </div>
        <button onClick={handleSubmit} className="submit-button">
          결과 보기
        </button>
      </main>
    </div>
  );
}

export default SymptomsCheck;
