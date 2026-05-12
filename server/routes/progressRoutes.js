const express = require("express");
const router = express.Router();
const progressController = require("../controllers/progressController");

router.get("/", progressController.getProgressLogs);
router.post("/", progressController.logProgress);
router.delete("/:id", progressController.deleteProgressLog);

module.exports = router;
