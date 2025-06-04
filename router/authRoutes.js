const express = require("express");
const router = express.Router();
const authController = require("../controller/authControllers");

/**
 * @swagger
 * /auth/apple-login:
 *   post:
 *     summary: Apple 로그인 - 이메일과 유저이름을 받아 JWT 토큰 반환
 *     description: iOS에서 전달한 이메일과 사용자 이름으로 로그인하거나 회원가입하고 JWT 토큰을 반환합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - name
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: example@apple.com
 *               name:
 *                 type: string
 *                 example: 서동빈
 *     responses:
 *       200:
 *         description: 로그인 성공 (JWT 토큰 반환)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT 토큰
 *       400:
 *         description: 이메일 또는 이름 누락
 *       500:
 *         description: 서버 오류
 */
router.post("/apple-login", authController.appleLogin);

module.exports = router;
