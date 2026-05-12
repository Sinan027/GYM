const mongoose = require("mongoose");

const broadcastSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["info", "urgent"],
    default: "info",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Broadcast", broadcastSchema);
