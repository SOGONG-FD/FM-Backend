const express = require("express");
const router = express.Router();
const postController = require("../controller/postControllers");
const token = require("../middleware/token");

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: 게시글 생성
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: 게시글 생성 성공
 *       500:
 *         description: 서버 오류
 */
router.post("/", token.verifyToken, postController.createPost);

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: 전체 게시글 조회
 *     responses:
 *       200:
 *         description: 게시글 목록
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/", postController.getAllPosts);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: 게시글 단일 조회
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 게시글 정보
 *       404:
 *         description: 게시글 없음
 */
router.get("/:id", postController.getPostById);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: 게시글 삭제
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 삭제 성공
 *       500:
 *         description: 삭제 실패
 */
router.delete("/:id", token.verifyToken, postController.deletePost);

module.exports = router;
