const express = require("express");
const router = express.Router();
const controller = require("../controllers/programController");
const upload = require("../config/multer");

router.get("/", controller.getPrograms);
router.get("/:id", controller.getProgramById);
router.post("/", upload.single("image"), controller.createProgram);
router.put("/:id", upload.single("image"), controller.updateProgram);
router.delete("/:id", controller.deleteProgram);

module.exports = router;