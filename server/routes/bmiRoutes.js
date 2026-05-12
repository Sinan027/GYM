const express = require("express");
const router = express.Router();
const { saveBMI, getBMIHistory, getAllBMIHistory, deleteBMIRecord } = require("../controllers/bmiController");
const { protect, admin } = require("../middleware/authMiddleware");

// Protected routes (require user login)
router.post("/", protect, saveBMI);
router.get("/", protect, getBMIHistory);

// Admin routes
router.get("/admin/all", protect, admin, getAllBMIHistory);
router.delete("/admin/:id", protect, admin, deleteBMIRecord);

module.exports = router;
