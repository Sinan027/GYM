const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");
const fs = require("fs");
const path = require("path");

let storage;

if (process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_KEY !== "your_key") {
  storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "fitness-app",
      allowed_formats: ["jpg", "png", "jpeg"],
    },
  });
} else {
  const uploadDir = path.join(__dirname, "../uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
}

const upload = multer({ storage });

module.exports = upload;