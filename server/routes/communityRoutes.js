const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");

const {
  getPosts,
  createPost,
  likePost,
  updatePost,
  deletePost
} = require("../controllers/communityController");

// Public/Protected Routes
router.get("/", getPosts);
router.post("/", createPost); // Users can create posts
router.put("/:id/like", likePost); // Users can like posts

// Admin Routes
router.put("/:id", protect, admin, updatePost);
router.delete("/:id", protect, admin, deletePost);

module.exports = router;
