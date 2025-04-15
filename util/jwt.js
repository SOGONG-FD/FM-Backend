const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "your_jwt_secret";

exports.generateToken = (payload) => {
  return jwt.sign(payload, secret, { expiresIn: "7d" });
};

exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
};
