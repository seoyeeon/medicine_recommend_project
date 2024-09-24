const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3000;

// 헤더 크기 제한을 늘리는 옵션 설정
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// JSON 요청 처리 미들웨어
app.use(express.json());
app.use(cors());  // CORS 허용

// MySQL 연결 설정
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'seoyeon0604',  // 실제 MySQL 비밀번호
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
app.use('/images', express.static(path.join(__dirname, 'medi_database', 'medi_jpg')));

// API 엔드포인트 (약 이름으로 검색)
app.get('/api/medicines', (req, res) => {
  console.log('GET /api/medicines 요청이 들어왔습니다.');  // 요청 로그
  const query = req.query.query;
  const sql = 'SELECT * FROM OTC_Medicines WHERE Medicine_Name LIKE ?';
  db.query(sql, [`%${query}%`], (err, results) => {
    if (err) {
      return res.status(500).send('데이터베이스 쿼리 오류');
    }
    console.log('데이터베이스 쿼리 성공:', results);  // 쿼리 결과 로그
    //console.log('쿼리 결과:', results);  // 쿼리 결과 확인
    res.json(results);
  });
});

// React 정적 파일 서빙 (빌드된 파일)
app.use(express.static(path.join(__dirname, 'client/build')));

// React 앱으로 라우팅
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// 서버 실행
app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});

const http = require('http');

const server = http.createServer(app);

// 기본적으로 헤더 크기는 8KB로 설정되어 있습니다. 이를 늘릴 수 있습니다.
server.maxHeadersCount = 1000;  // 헤더 최대 개수를 설정
server.listen(3000);
