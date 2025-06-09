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
 *     tags:
 *       - Posts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - title
 *               - content
 *             properties:
 *               user_id:
 *                 type: string
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               title:
 *                 type: string
 *                 example: "첫 게시글 제목"
 *               content:
 *                 type: string
 *                 example: "게시글 내용입니다."
 *     responses:
 *       201:
 *         description: 게시글 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 게시글 생성 완료
 *                 post_id:
 *                   type: string
 *                   example: "550e8400-e29b-41d4-a716-446655440000"
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: 게시글 생성 실패
 */
router.post("/", token.verifyToken, postController.createPost);

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: 전체 게시글 조회
 *     tags:
 *       - Posts
 *     responses:
 *       200:
 *         description: 게시글 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 2
 *                 posts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       post_id:
 *                         type: string
 *                         example: "550e8400-e29b-41d4-a716-446655440000"
 *                       user_id:
 *                         type: string
 *                         example: "123e4567-e89b-12d3-a456-426614174000"
 *                       title:
 *                         type: string
 *                         example: "첫 게시글 제목"
 *                       content:
 *                         type: string
 *                         example: "게시글 내용입니다."
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-06-09T12:00:00Z"
 */
router.get("/", postController.getAllPosts);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: 게시글 단일 조회
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         description: 게시글 ID
 *         required: true
 *         schema:
 *           type: string
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       200:
 *         description: 게시글 정보 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 post:
 *                   type: object
 *                   properties:
 *                     post_id:
 *                       type: string
 *                       example: "550e8400-e29b-41d4-a716-446655440000"
 *                     user_id:
 *                       type: string
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     title:
 *                       type: string
 *                       example: "첫 게시글 제목"
 *                     content:
 *                       type: string
 *                       example: "게시글 내용입니다."
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-06-09T12:00:00Z"
 *       404:
 *         description: 게시글 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: 게시글 없음
 */
router.get("/:id", postController.getPostById);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: 게시글 삭제
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         description: 게시글 ID
 *         required: true
 *         schema:
 *           type: string
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       200:
 *         description: 게시글 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 게시글 삭제 완료
 *       404:
 *         description: 삭제할 게시글 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: 삭제할 게시글 없음
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: 삭제 실패
 */
router.delete("/:id", token.verifyToken, postController.deletePost);

module.exports = router;
