const db = require("../models/db");
const jwt = require("../utils/jwt");
const { v4: uuidv4 } = require("uuid");

exports.appleLogin = (req, res) => {
  const { email, name } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: "이메일과 이름이 필요합니다." });
  }

  // 이메일로 사용자 존재 여부 확인
  const findUserQuery = "SELECT * FROM Users WHERE email = ?";
  db.query(findUserQuery, [email], (err, results) => {
    if (err) return res.status(500).json({ error: "DB 조회 실패" });

    if (results.length > 0) {
      // 사용자 존재 → 로그인
      const user = results[0];
      const token = jwt.generateToken({
        user_id: user.user_id,
        email: user.email,
      });
      return res.status(200).json({ token });
    }

    // 사용자 없음 → 회원가입
    const newUserId = uuidv4();
    const insertUserQuery =
      "INSERT INTO Users (user_id, name, email) VALUES (?, ?, ?)";
    db.query(insertUserQuery, [newUserId, name, email], (err) => {
      if (err) return res.status(500).json({ error: "회원가입 실패" });

      const token = jwt.generateToken({ user_id: newUserId, email });
      return res.status(200).json({ token });
    });
  });
};
