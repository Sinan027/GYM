const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const {
  createPurchase,
  getUserPurchases,
  getAllPurchases
} = require("../controllers/purchaseController");

// User routes
router.post("/", protect, createPurchase);
router.get("/my-purchases", protect, getUserPurchases);

// Admin routes
router.get("/", protect, admin, getAllPurchases);

module.exports = router;
