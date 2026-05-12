const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    level: String,
    duration: Number,


    image: String,
    video: String,

    exercises: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workout", workoutSchema);