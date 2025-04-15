const express = require("express");
const db = require("./models/db");

const app = express();

db.getConnection()
  .then((connection) => {
    console.log("연결 성공");
    connection.release();
  })
  .catch((err) => {
    console.error("연결 실패:", err);
  });

app.listen(3000, () => {
  console.log("서버 실행 중 http://localhost:3000");
});
