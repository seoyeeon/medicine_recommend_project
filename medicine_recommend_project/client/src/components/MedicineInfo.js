import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './MedicineInfo.css'; // CSS 파일을 추가로 임포트합니다.

function MedicineInfo() {
  const { symptomName } = useParams();

  return (
    <div className="medicine-info-container">
      <header className="medicine-info-header">
        <Link to="/">
          <img src="logo1.png" className="App-logo" alt="logo" />
        </Link>
      </header>
      <main className="medicine-info-main">
        <h2>Medicine Information for: {symptomName}</h2>
        <p>Here you can show medicine information related to the selected symptom, such as recommended medicines, dosage, etc.</p>
      </main>
    </div>
  );
}

export default MedicineInfo;
