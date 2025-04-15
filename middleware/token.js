const jwt = require("../util/jwt");

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "토큰 없음" });

  const token = authHeader.split(" ")[1]; // 'Bearer [token]' 형식
  if (!token) return res.status(401).json({ error: "유효하지 않은 토큰 형식" });

  try {
    const decoded = jwt.verify(token);
    req.user = decoded; // 이후 컨트롤러에서 req.user로 접근 가능
    next();
  } catch (err) {
    return res.status(403).json({ error: "토큰 검증 실패" });
  }
};
