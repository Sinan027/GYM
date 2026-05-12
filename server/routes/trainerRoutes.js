const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const trainerController = require("../controllers/trainerController");

router.get("/", trainerController.getTrainers);
router.get("/:id", trainerController.getTrainerById);
router.post("/", upload.single("image"), trainerController.createTrainer);
router.put("/:id", upload.single("image"), trainerController.updateTrainer);
router.delete("/:id", trainerController.deleteTrainer);

module.exports = router;
