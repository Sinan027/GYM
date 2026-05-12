const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const exerciseBankController = require("../controllers/exerciseBankController");
const { protect, admin } = require("../middleware/authMiddleware");

// Note: For now we leave get public, but post/delete could be protected
router.get("/", exerciseBankController.getExercises);
router.post("/", protect, admin, upload.single("image"), exerciseBankController.createExercise);
router.delete("/:id", protect, admin, exerciseBankController.deleteExercise);

module.exports = router;
