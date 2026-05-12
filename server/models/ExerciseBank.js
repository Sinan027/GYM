const mongoose = require("mongoose");

const exerciseBankSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: "🏋️",
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ExerciseBank", exerciseBankSchema);
