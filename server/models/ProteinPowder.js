const mongoose = require("mongoose");

const proteinPowderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String, // Can be a URL or local path
    },
    description: {
      type: String,
    },
    inStock: {
      type: Boolean,
      default: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProteinPowder", proteinPowderSchema);
