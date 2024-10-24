import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios'; // Axios 임포트
import './MedicineInfo.css'; // 스타일 파일을 추가합니다.

function MedicineInfo() {
  const { medicineName } = useParams(); // URL 파라미터에서 약 이름 가져오기
  const [medicine, setMedicine] = useState(null); // 약 정보 상태 추가
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    const fetchMedicineInfo = async () => {
      try {
        const response = await axios.get(`/api/medicines/${medicineName}`);
        setMedicine(response.data); // 약 정보 저장

        // API URL 및 이미지 경로 로그 출력
        console.log('API URL:', process.env.REACT_APP_API_URL);
        console.log('Image Path:', response.data.Image_Path);
        
      } catch (err) {
        setError('약 정보를 불러오는 데 오류가 발생했습니다.');
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchMedicineInfo();
  }, [medicineName]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="medicine-info-container">
      <header className="medicine-info-header">
        <Link to="/">
          {/* 절대 경로를 사용하여 public 폴더의 logo1.png를 불러옵니다. */}
          <img src="logo1.png" className="App-logo" alt="logo" />
        </Link>
      </header>
      <main className="medicine-info-main">
        {medicine ? (
          <div>
            <h2>{medicine.Medicine_Name}</h2>
            <p>Main Ingredients: {medicine.Main_Ingredients}</p>
            <p>Effects: {medicine.Effects}</p>
            <p>Dosage: {medicine.Dosage_by_Age}</p>
            {/* 약 이미지 경로 설정 */}
            <img 
              src={`${process.env.REACT_APP_API_URL}${medicine.Image_Path}`} 
              alt={medicine.Medicine_Name} 
              style={{ width: '100%', maxWidth: '400px', height: 'auto' }} 
            />
          </div>
        ) : (
          <p>약 정보가 없습니다.</p>
        )}
      </main>
    </div>
  );
}

export default MedicineInfo;
