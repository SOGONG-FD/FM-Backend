const jwt = require("jsonwebtoken");

function generateClientSecret() {
  const claims = {
    iss: process.env.APPLE_TEAM_ID,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    aud: "https://appleid.apple.com",
    sub: process.env.APPLE_CLIENT_ID,
  };

  return jwt.sign(claims, process.env.APPLE_PRIVATE_KEY.replace(/\\n/g, "\n"), {
    algorithm: "ES256",
    header: {
      alg: "ES256",
      kid: process.env.APPLE_KEY_ID,
    },
  });
}

module.exports = { generateClientSecret };
