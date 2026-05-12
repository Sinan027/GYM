const express = require("express");
const router = express.Router();
const upload = require("../config/multer");

const {
  getAllProteinPowders,
  getProteinPowderById,
  createProteinPowder,
  updateProteinPowder,
  deleteProteinPowder,
} = require("../controllers/proteinPowderController");

// GET all
router.get("/", getAllProteinPowders);

// GET single
router.get("/:id", getProteinPowderById);

// POST
router.post("/", upload.single("image"), createProteinPowder);

// PUT
router.put("/:id", upload.single("image"), updateProteinPowder);

// DELETE
router.delete("/:id", deleteProteinPowder);

module.exports = router;
