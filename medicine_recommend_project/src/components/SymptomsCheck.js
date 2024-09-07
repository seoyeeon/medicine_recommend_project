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

  const handleSubmit = () => {
    navigate('/results', { state: { selectedSymptoms } });
  };

  return (
    <div className="symptoms-check-container">
      <header className="symptoms-check-header">
        <Link to="/">
          <img src="logo1.png" className="App-logo" alt="logo" />
        </Link>
      </header>
      <main className="symptoms-check-main">
        <h2 className="symptoms-title">어디가 불편하신가요?</h2>
        <div className="checkbox-group">
          {['Fever', 'Cough', 'Headache', 'Fatigue'].map((symptom, index) => (
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
