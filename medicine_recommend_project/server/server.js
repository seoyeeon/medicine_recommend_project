const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3000; // 사용할 포트

// 헤더 크기 제한을 늘리는 옵션 설정
app.use(express.json({ limit: '1mb' })); // 요청 본문 크기 제한
app.use(express.urlencoded({ limit: '1mb', extended: true })); // URL 인코딩 요청 크기 제한

// CORS 허용
app.use(cors());

// MySQL 연결 설정
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',  // 실제 MySQL 비밀번호
  database: 'MedicineDB',
});

db.connect(err => {
  if (err) {
    console.error('MySQL 연결 오류:', err);
    return;
  }
  console.log('MySQL 연결 성공!');
});

// 정적 파일 서빙 (약 이미지 파일들)
const imagesDirectory = path.join(__dirname, '..', 'medi_database', 'medi_jpg', 'images');
app.use('/images', express.static(imagesDirectory));

// API 엔드포인트 (증상에 따른 의약품 정보 조회)
app.post('/api/medicines/symptoms', (req, res) => {
  const { symptoms } = req.body;

  if (!symptoms || symptoms.length === 0) {
    return res.status(400).send('증상이 선택되지 않았습니다.');
  }

  const queries = symptoms.map(symptom => {
    return `Effects LIKE '%${symptom}%'`;
  }).join(' OR '); // "OR" 조건을 사용하여 쿼리 생성

  db.query(`SELECT * FROM OTC_Medicines WHERE ${queries}`, (err, results) => {
    if (err) {
      console.error('데이터베이스 쿼리 오류:', err);
      return res.status(500).send('데이터베이스 쿼리 오류');
    }
    console.log('API 요청 수신:', symptoms);
    res.json(results); // 결과 반환
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
    console.log('데이터베이스 쿼리 성공:', results);
    res.json(results);
  });
});

// API 엔드포인트 (약 이름으로 특정 약 정보 조회)
app.get('/api/medicines/:medicineName', (req, res) => {
  const medicineName = req.params.medicineName;
  const sql = 'SELECT * FROM OTC_Medicines WHERE Medicine_Name LIKE ?';

  db.query(sql, [`%${medicineName}%`], (err, results) => {
    if (err) {
      return res.status(500).send('데이터베이스 쿼리 오류');
    }
    console.log('API 요청 수신:', medicineName);
    res.json(results.length > 0 ? results[0] : null); // 약 정보를 객체로 반환, 결과가 없을 경우 null 반환
  });
});

// React 정적 파일 서빙 (빌드된 파일)
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// React 앱으로 라우팅
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

// 서버 실행
app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});
