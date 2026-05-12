const express = require("express");
const router = express.Router();

const {
  getAllNutrition,
  getNutritionById,
  createNutrition,
  updateNutrition,
  deleteNutrition,
} = require("../controllers/nutritionController");

const upload = require("../config/multer");

// GET all
router.get("/", getAllNutrition);

// GET single
router.get("/:id", getNutritionById);

// POST
router.post("/", upload.single("image"), createNutrition);

// PUT
router.put("/:id", upload.single("image"), updateNutrition);

// DELETE
router.delete("/:id", deleteNutrition);

module.exports = router;