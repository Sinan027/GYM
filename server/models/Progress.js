const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
  {
    weight: {
      type: Number,
      required: true,
    },
    workoutsCompleted: {
      type: String,
    },
    calories: {
      type: Number,
    },
    chest: {
      type: Number,
    },
    waist: {
      type: Number,
    },
    // We can manually specify date or rely on timestamps
    date: {
      type: Date,
      default: Date.now,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Progress", progressSchema);
