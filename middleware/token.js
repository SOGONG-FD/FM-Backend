const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "토큰 없음" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "유효하지 않은 토큰 형식" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ error: "토큰 검증 실패", detail: err.message });
  }
};
