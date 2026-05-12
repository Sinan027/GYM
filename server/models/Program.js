const mongoose = require("mongoose");

const programSchema = new mongoose.Schema({
  title: String,
  duration: String,
  level: String,
  description: String,
  videoUrl: String,
});

module.exports = mongoose.model("Program", programSchema);