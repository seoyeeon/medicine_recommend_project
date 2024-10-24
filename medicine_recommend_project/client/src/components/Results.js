import React from 'react';
import { useLocation } from 'react-router-dom';

function Results() {
  const location = useLocation();
  const { data } = location.state || { data: [] }; // 안전하게 데이터 가져오기

  return (
    <div>
      <h2>결과</h2>
      {data.length > 0 ? (
        <ul>
          {data.map((medicine, index) => (
            <li key={index}>
              <strong>{medicine.Medicine_Name}</strong>
              <p>효능: {medicine.Effects}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>해당하는 의약품이 없습니다.</p>
      )}
    </div>
  );
}

export default Results;
