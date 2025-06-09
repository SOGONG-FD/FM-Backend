const db = require("../models/db");
const jwt = require("../util/jwt");
const { v4: uuidv4 } = require("uuid");

exports.appleLogin = (req, res) => {
  try {
    console.log("[appleLogin] 요청 Body:", req.body);

    const { id, email, name } = req.body;

    if (!id || !email || !name) {
      return res
        .status(400)
        .json({ error: "id, 이메일, 이름이 모두 필요합니다." });
    }

    // 이메일로 사용자 존재 여부 확인
    const findUserQuery = "SELECT * FROM Users WHERE email = ?";
    db.query(findUserQuery, [email], (err, results) => {
      if (err) {
        console.error("[appleLogin] 사용자 조회 실패:", err);
        return res.status(500).json({ error: "DB 조회 실패" });
      }

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
        "INSERT INTO Users (user_id, apple_id, name, email) VALUES (?, ?, ?, ?)";
      db.query(insertUserQuery, [newUserId, id, name, email], (err) => {
        if (err) {
          console.error("[appleLogin] 회원가입 실패:", err);
          return res.status(500).json({ error: "회원가입 실패" });
        }

        const token = jwt.generateToken({ user_id: newUserId, email });
        return res.status(200).json({ token });
      });
    });
  } catch (err) {
    console.error("[appleLogin] 서버 오류:", err);
    return res.status(500).json({ error: "서버 오류" });
  }
};
