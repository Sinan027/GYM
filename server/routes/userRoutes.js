const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { updateProfile } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const Purchase = require("../models/Purchase");
const Booking = require("../models/Booking");

//  GET USER ACCESS STATUS
router.get("/access-status", authMiddleware.protect, async (req, res) => {
  try {
    const userId = req.user._id;

    const purchase = await Purchase.findOne({ user: userId });
    const booking = await Booking.findOne({ user: userId });

    const hasPurchased = !!purchase;
    const hasTrainer = !!booking;
    const isApproved = booking?.status === "Confirmed";

    const isLocked = !(hasPurchased && hasTrainer && isApproved);

    res.json({
      hasPurchased,
      hasTrainer,
      isApproved,
      isLocked
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//  GET ALL USERS
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//  UPDATE USER (role + block toggle)
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/profile", authMiddleware.protect, updateProfile);


module.exports = router;