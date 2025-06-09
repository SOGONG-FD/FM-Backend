const { v4: uuidv4 } = require("uuid");
const db = require("../models/db");

// 게시글 전체 조회
exports.getAllPosts = (req, res) => {
  const query = "SELECT * FROM Posts ORDER BY created_at DESC";
  db.query(query, (err, results) => {
    if (err)
      return res.status(500).json({ success: false, error: "DB 조회 실패" });

    res.json({
      success: true,
      count: results.length,
      posts: results,
    });
  });
};

// 게시글 생성
exports.createPost = (req, res) => {
  const { user_id, title, content } = req.body;
  const post_id = uuidv4();
  const query =
    "INSERT INTO Posts (post_id, user_id, title, content, created_at) VALUES (?, ?, ?, ?, NOW())";
  db.query(query, [post_id, user_id, title, content], (err) => {
    if (err)
      return res
        .status(500)
        .json({ success: false, error: "게시글 생성 실패" });

    res.status(201).json({
      success: true,
      message: "게시글 생성 완료",
      post_id,
    });
  });
};

// 게시글 단일 조회
exports.getPostById = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM Posts WHERE post_id = ?";
  db.query(query, [id], (err, results) => {
    if (err)
      return res.status(500).json({ success: false, error: "DB 조회 실패" });
    if (results.length === 0)
      return res.status(404).json({ success: false, error: "게시글 없음" });

    res.json({
      success: true,
      post: results[0],
    });
  });
};

// 게시글 삭제
exports.deletePost = (req, res) => {
  const { id } = req.params;

  // 삭제할 게시글이 있는지 먼저 확인
  const checkQuery = "SELECT * FROM Posts WHERE post_id = ?";
  db.query(checkQuery, [id], (err, results) => {
    if (err)
      return res.status(500).json({ success: false, error: "삭제 실패" });
    if (results.length === 0)
      return res
        .status(404)
        .json({ success: false, error: "삭제할 게시글 없음" });

    // 실제 삭제 실행
    const deleteQuery = "DELETE FROM Posts WHERE post_id = ?";
    db.query(deleteQuery, [id], (delErr) => {
      if (delErr)
        return res.status(500).json({ success: false, error: "삭제 실패" });

      res.json({
        success: true,
        message: "게시글 삭제 완료",
      });
    });
  });
};
