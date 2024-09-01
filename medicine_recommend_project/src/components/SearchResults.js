import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './SearchResults.css';

function SearchResults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  // 실제 검색 결과 데이터를 여기에 추가하거나 API 호출을 통해 가져올 수 있습니다.
  const results = [
    'Result 1',
    'Result 2',
    'Result 3',
    'Result 4'
  ].filter(result => result.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="search-results-container">
      <header className="search-results-header">
        <img src="logo1.png" className="App-logo" alt="logo" />
        <Link to="/" className="home-button">Home</Link>
      </header>
      <main className="search-results-main">
        <h1>다음 키워드로 검색한 결과입니다: "{query}"</h1>
        <ul className="results-list">
          {results.map((result, index) => (
            <li key={index} className="result-item">{result}</li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default SearchResults;
