const Progress = require("../models/Progress");

exports.getProgressLogs = async (req, res) => {
  try {
    const logs = await Progress.find().sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.logProgress = async (req, res) => {
  try {
    const { weight, workoutsCompleted, calories, chest, waist } = req.body;
    const log = new Progress({
      weight,
      workoutsCompleted,
      calories,
      chest,
      waist,
    });
    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProgressLog = async (req, res) => {
  try {
    await Progress.findByIdAndDelete(req.params.id);
    res.json({ message: "Log deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
