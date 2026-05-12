const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const blogController = require("../controllers/blogController");

router.get("/", blogController.getBlogs);
router.post("/", upload.single("image"), blogController.createBlog);
router.put("/:id", upload.single("image"), blogController.updateBlog);
router.delete("/:id", blogController.deleteBlog);

module.exports = router;