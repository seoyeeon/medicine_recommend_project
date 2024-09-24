import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './SearchResults.css';

function SearchResults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const encodedQuery = encodeURIComponent(query);  // 검색어를 URL에 맞게 인코딩
        const response = await axios.get(`/api/medicines?query=${encodedQuery}`);
        setResults(response.data);  // 검색 결과를 state에 저장
      } catch (error) {
          // Axios 에러 로그 확인
          if (error.response) {
            // 서버가 응답을 보냈으나 에러 상태일 때 (예: 4xx, 5xx)
            console.error('서버 응답 오류:', error.response.status, error.response.data);
          } else if (error.request) {
            // 요청이 전송되었으나 서버로부터 응답을 받지 못한 경우
            console.error('서버 응답 없음:', error.request);
          } else {
            // 기타 에러
            console.error('Axios 설정 오류:', error.message);
          }
          console.error('전체 에러 정보:', error.config);  // Axios 설정 정보를 출력
        }
    };

    if (query) {
      fetchData();
    }
  }, [query]);  // query가 변경될 때마다 실행

  return (
    <div className="search-results-container">
      <h1>검색 결과: "{query}"</h1>
      <ul className="results-list">
        {results.length > 0 ? (
          results.map((result, index) => (
            <li key={index} className="result-item">
              <h2>{result.Medicine_Name}</h2>
              <img src={`http://localhost:3000${result.Image_Path}`} alt={result.Medicine_Name} className="medicine-image" />
              <p>성분: {result.Main_Ingredients}</p>
              <p>효과: {result.Effects}</p>
              <p>복용량: {result.Dosage_by_Age}</p>
              <p>제약회사: {result.Pharmaceutical_Company}</p>
            </li>
          ))
        ) : (
          <li>검색 결과가 없습니다.</li>
        )}
      </ul>
    </div>
  );
}

export default SearchResults;
