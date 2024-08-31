import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import NameSearch from './components/NameSearch';
import SymptomsCheck from './components/SymptomsCheck';
import SearchResults from './components/SearchResults';
import './App.css';
import Results from './components/Results';
import MedicineInfo from './components/MedicineInfo';

function Home() {
  return (
    <div className="App-main">
      <header className="App-header">
        <img src="your-logo-url.png" className="App-logo" alt="logo" />
        <div className="title">약 추천 프로그램</div>
      </header>
      <div className="button-container">
        <Link to="/NameSearch" className="App-button">이름으로 검색</Link>
        <Link to="/SymptomsCheck" className="App-button">증상으로 검색</Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/NameSearch" element={<NameSearch />} />
        <Route path="/SymptomsCheck" element={<SymptomsCheck />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/Results" element={<Results />} />
        <Route path="/MedicineInfo" element={<MedicineInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
