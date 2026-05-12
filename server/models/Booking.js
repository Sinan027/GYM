const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trainer",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
      default: "Pending",
    },
    sessionDate: {
      type: Date,
      required: false,
    },
    notes: {
      type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
