const mongoose = require("mongoose");

const trainerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    expertise: {
      type: String,
      required: true,
    },
    availableTime: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trainer", trainerSchema);
