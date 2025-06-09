// const db = require("../models/db");
// const jwt = require("../util/jwt");
// const { v4: uuidv4 } = require("uuid");

// exports.appleLogin = (req, res) => {
//   try {
//     // 디버깅: 요청 body 로그
//     console.log("[appleLogin] 요청 Body:", req.body);

//     const { email, name } = req.body;

//     if (!email || !name) {
//       return res.status(400).json({ error: "이메일과 이름이 필요합니다." });
//     }

//     // 이메일로 사용자 존재 여부 확인
//     const findUserQuery = "SELECT * FROM Users WHERE email = ?";
//     db.query(findUserQuery, [email], (err, results) => {
//       if (err) {
//         console.error("[appleLogin] 사용자 조회 실패:", err);
//         return res.status(500).json({ error: "DB 조회 실패" });
//       }

//       if (results.length > 0) {
//         // 사용자 존재 → 로그인
//         const user = results[0];
//         const token = jwt.generateToken({
//           user_id: user.user_id,
//           email: user.email,
//         });
//         return res.status(200).json({ token });
//       }

//       // 사용자 없음 → 회원가입
//       const newUserId = uuidv4();
//       const insertUserQuery =
//         "INSERT INTO Users (user_id, name, email) VALUES (?, ?, ?)";
//       db.query(insertUserQuery, [newUserId, name, email], (err) => {
//         if (err) {
//           console.error("[appleLogin] 회원가입 실패:", err);
//           return res.status(500).json({ error: "회원가입 실패" });
//         }

//         const token = jwt.generateToken({ user_id: newUserId, email });
//         return res.status(200).json({ token });
//       });
//     });
//   } catch (err) {
//     console.error(" [appleLogin] 서버 오류:", err);
//     return res.status(500).json({ error: "서버 오류" });
//   }
// };

const db = require("../models/db");
const jwt = require("../util/jwt");

exports.appleLogin = async (req, res) => {
  console.log("[appleLogin] 요청 들어옴");

  try {
    const { appleId, name, email } = req.body;
    console.log("[appleLogin] 요청 바디:", req.body);

    if (!appleId || !name || !email) {
      console.log("[appleLogin] 필수 파라미터 누락");
      return res.status(400).json({ error: "appleId, name, email 필요" });
    }

    console.log("[appleLogin] 사용자 존재 여부 확인 쿼리 실행 전");
    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE apple_id = ?",
      [appleId]
    );
    console.log("[appleLogin] 사용자 조회 결과:", existingUser);

    let user;

    if (existingUser.length === 0) {
      console.log("[appleLogin] 신규 사용자 등록 시작");
      const result = await db.query(
        "INSERT INTO users (apple_id, name, email) VALUES (?, ?, ?)",
        [appleId, name, email]
      );
      console.log("[appleLogin] 신규 사용자 등록 결과:", result);

      user = {
        id: result.insertId,
        apple_id: appleId,
        name,
        email,
      };
    } else {
      user = existingUser[0];
      console.log("[appleLogin] 기존 사용자:", user);
    }

    const token = jwt.generateToken({
      userId: user.id,
      appleId: user.apple_id,
    });
    console.log("[appleLogin] 토큰 생성 완료:", token);

    res.json({ token });
  } catch (error) {
    console.error("[appleLogin] 에러 발생:", error);
    res.status(500).json({ error: "서버 오류 발생" });
  }
};
