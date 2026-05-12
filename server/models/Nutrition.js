const mongoose = require("mongoose");

const nutritionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    calories: {
      type: Number,
      required: true,
    },
    protein: {
      type: Number,
      required: true,
    },
    carbs: {
      type: Number,
      required: true,
    },
    fat: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true, // adds createdAt, updatedAt
  }
);

module.exports = mongoose.model("Nutrition", nutritionSchema);