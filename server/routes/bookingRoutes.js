const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const {
  createBooking,
  getUserBookings,
  getAllBookings,
  updateBookingStatus,
  deleteBooking
} = require("../controllers/bookingController");

// User routes
router.post("/", protect, createBooking);
router.get("/mybookings", protect, getUserBookings);

// Admin routes
router.get("/", protect, admin, getAllBookings);
router.put("/:id", protect, admin, updateBookingStatus);
router.delete("/:id", protect, admin, deleteBooking);

module.exports = router;
