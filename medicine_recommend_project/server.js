const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// JSON 요청 처리 미들웨어
app.use(express.json());

// MySQL 연결 설정
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // 데이터베이스 사용자 이름
  password: 'seoyeon0604', // 데이터베이스 비밀번호
  database: 'MedicineDB', // 사용할 데이터베이스
});

db.connect(err => {
  if (err) {
    console.error('MySQL 연결 오류:', err);
    return;
  }
  console.log('MySQL 연결 성공!');
});

// API 엔드포인트 설정 (약 목록 가져오기)
app.get('/medicines', (req, res) => {
  const sql = 'SELECT * FROM OTC_Medicines';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send('데이터베이스 쿼리 오류');
    }
    res.json(results);
  });
});

app.get('/medicines', (req, res) => {
  console.log('GET /medicines 요청이 들어왔습니다.');
  const sql = 'SELECT * FROM OTC_Medicines';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send('데이터베이스 쿼리 오류');
    }
    console.log('데이터베이스 쿼리 성공:', results);
    res.json(results);
  });
});

app.get('/', (req, res) => {
  res.send('서버가 정상적으로 동작 중입니다!');
});


app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});
