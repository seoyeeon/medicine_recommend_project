const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3000;

// JSON 요청 본문 크기 제한 설정
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '1mb', extended: true }));

// CORS 허용
// app.use(cors());
// const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000' }));


// MySQL 연결 설정
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'MedicineDB',
});

db.connect(err => {
  if (err) {
    console.error('MySQL 연결 오류:', err);
    return;
  }
  console.log('MySQL 연결 성공!');
});

// 정적 파일 제공 (이미지 및 React 빌드 파일)
const imagesDirectory = path.join(__dirname, '..', 'medi_database', 'medi_jpg', 'images');
app.use('/images', express.static(imagesDirectory));
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// API 엔드포인트 (증상에 따른 약 정보 조회)
app.post('/api/medicines/symptoms', (req, res) => {
  const { symptoms } = req.body;

  if (!symptoms || symptoms.length === 0) {
    return res.status(400).send('증상이 선택되지 않았습니다.');
  }

  const queries = symptoms.map(symptom => `Effects LIKE '%${symptom}%'`).join(' OR ');

  db.query(`SELECT * FROM OTC_Medicines WHERE ${queries}`, (err, results) => {
    if (err) {
      console.error('데이터베이스 쿼리 오류:', err);
      return res.status(500).send('데이터베이스 쿼리 오류');
    }
    res.json(results);
  });
});

// API 엔드포인트 (약 이름으로 검색)
app.get('/api/medicines', (req, res) => {
  const query = req.query.query;
  const sql = 'SELECT * FROM OTC_Medicines WHERE Medicine_Name LIKE ?';

  db.query(sql, [`%${query}%`], (err, results) => {
    if (err) {
      return res.status(500).send('데이터베이스 쿼리 오류');
    }
    res.json(results);
  });
});

// API 엔드포인트 (특정 약 정보 조회)
app.get('/api/medicines/:medicineName', (req, res) => {
  const medicineName = req.params.medicineName;
  const sql = 'SELECT * FROM OTC_Medicines WHERE Medicine_Name LIKE ?';

  db.query(sql, [`%${medicineName}%`], (err, results) => {
    if (err) {
      return res.status(500).send('데이터베이스 쿼리 오류');
    }
    res.json(results.length > 0 ? results[0] : null);
  });
});

// 모든 경로에 대해 React 앱으로 라우팅 (404 처리 포함)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

// 서버 실행
app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});
