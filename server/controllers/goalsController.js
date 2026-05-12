const Goal = require("../models/goals");

// GET ALL GOALS
exports.getGoals = async (req, res) => {
  try {
    const goals = await Goal.find();
    res.json(goals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE A GOAL
exports.createGoal = async (req, res) => {
  try {
    const { title, description, target } = req.body;
    const newGoal = new Goal({ title, description, target });
    await newGoal.save();
    res.status(201).json(newGoal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE A GOAL
exports.deleteGoal = async (req, res) => {
  try {
    await Goal.findByIdAndDelete(req.params.id);
    res.json({ message: "Goal deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
