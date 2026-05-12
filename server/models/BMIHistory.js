const mongoose = require("mongoose");

const bmiHistorySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  bmi: { type: Number, required: true },
  status: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("BMIHistory", bmiHistorySchema);
