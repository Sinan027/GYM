const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    image: String,
    videoUrl: String,
    author: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);