const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'itemType'
    },
    itemType: {
      type: String,
      required: true,
      enum: ['Program', 'ProteinPowder']
    },
    paymentMethod: {
      type: String,
      enum: ["UPI", "Card", "GPay"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Completed", // Simulated payment is instantly completed
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Purchase", purchaseSchema);
