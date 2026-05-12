const express = require("express");
const router = express.Router();
const upload = require("../config/multer");

const {
  createWorkout,
  getWorkouts,
  updateWorkout,
  deleteWorkout,
} = require("../controllers/workoutController");

const { protect, admin } = require("../middleware/authMiddleware");

const uploadFields = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "video", maxCount: 1 }
]);

router.post("/", protect, admin, uploadFields, createWorkout);

router.get("/", getWorkouts);
router.put("/:id", protect, admin, uploadFields, updateWorkout);
router.delete("/:id", protect, admin, deleteWorkout);

module.exports = router;