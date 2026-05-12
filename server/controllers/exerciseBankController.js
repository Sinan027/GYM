const ExerciseBank = require("../models/ExerciseBank");

const getImageUrl = (req) => {
  if (req.file) {
    if (req.file.path.startsWith("http")) return req.file.path;
    return `http://localhost:5000/uploads/${req.file.filename}`;
  }
  return req.body.imageUrl || undefined;
};

// GET ALL
exports.getExercises = async (req, res) => {
  try {
    const exercises = await ExerciseBank.find();
    res.json(exercises);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE
exports.createExercise = async (req, res) => {
  try {
    const { name, category, icon } = req.body;
    const exercise = new ExerciseBank({
      name,
      category,
      icon: icon || "🏋️",
      image: getImageUrl(req) || "https://via.placeholder.com/150", 
    });
    await exercise.save();
    res.status(201).json(exercise);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
exports.deleteExercise = async (req, res) => {
  try {
    await ExerciseBank.findByIdAndDelete(req.params.id);
    res.json({ message: "Exercise deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
