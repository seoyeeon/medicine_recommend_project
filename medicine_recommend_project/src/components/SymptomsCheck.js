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
        <Link to="/" className="home-button">Home</Link>
      </header>
      <main className="symptoms-check-main">
        <h2>증상을 선택하세요</h2>
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              value="Fever"
              onChange={handleCheckboxChange}
            />
            Fever
          </label>
          <label>
            <input
              type="checkbox"
              value="Cough"
              onChange={handleCheckboxChange}
            />
            Cough
          </label>
          <label>
            <input
              type="checkbox"
              value="Headache"
              onChange={handleCheckboxChange}
            />
            Headache
          </label>
          <label>
            <input
              type="checkbox"
              value="Fatigue"
              onChange={handleCheckboxChange}
            />
            Fatigue
          </label>
        </div>
        <button onClick={handleSubmit} className="submit-button">
          Submit
        </button>
      </main>
    </div>
  );
}

export default SymptomsCheck;
