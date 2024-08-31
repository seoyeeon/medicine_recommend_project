import React from 'react';
import { useParams } from 'react-router-dom';

function MedicineInfo() {
  const { symptomName } = useParams();

  return (
    <div>
      <h2>Medicine Information for: {symptomName}</h2>
      <p>Here you can show medicine information related to the selected symptom, such as recommended medicines, dosage, etc.</p>
    </div>
  );
}

export default MedicineInfo;
