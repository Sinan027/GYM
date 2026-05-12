const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");

const { getDashboardStats, toggleBlockUser, removeUser, restoreUser, createBroadcast, deleteBroadcast, hardDeleteUser } = require("../controllers/adminController");

router.get("/dashboard-stats", protect, admin, getDashboardStats);
router.post("/broadcast", protect, admin, createBroadcast);
router.delete("/broadcast/:id", protect, admin, deleteBroadcast);
router.put("/users/:id/block", protect, admin, toggleBlockUser);
router.put("/users/:id/remove", protect, admin, removeUser);
router.put("/users/:id/restore", protect, admin, restoreUser);
router.delete("/users/:id/hard-delete", protect, admin, hardDeleteUser);

module.exports = router;