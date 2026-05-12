const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  title: String,
  description: String,
  target: Number,
  current: { type: Number, default: 0 },
});

module.exports = mongoose.model("Goal", goalSchema);