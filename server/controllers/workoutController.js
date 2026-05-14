const Workout = require("../models/Workout");

const getFileUrl = (req, fieldName, urlField) => {
  if (req.body && req.body[urlField]) return req.body[urlField];
  if (!req.files || !req.files[fieldName] || req.files[fieldName].length === 0) return undefined;
  const file = req.files[fieldName][0];
  if (file.path.startsWith("http")) return file.path;
  return `${process.env.BACKEND_URL}/uploads/${file.filename}`;
};

// CREATE
exports.createWorkout = async (req, res) => {
  try {
    const workoutData = { ...req.body };
    
    const imageUrl = getFileUrl(req, "image", "imageUrl");
    if (imageUrl) {
      workoutData.image = imageUrl;
    }

    const videoUrl = getFileUrl(req, "video", "videoUrl");
    if (videoUrl) {
      workoutData.video = videoUrl;
    }
    
    // If exercises comes as a comma-separated string, split it
    if (workoutData.exercises && typeof workoutData.exercises === 'string') {
      workoutData.exercises = workoutData.exercises.split(',').map(e => e.trim());
    }

    const workout = await Workout.create(workoutData);
    res.json(workout);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// GET ALL
exports.getWorkouts = async (req, res) => {
  const workouts = await Workout.find();
  res.json(workouts);
};

// UPDATE
exports.updateWorkout = async (req, res) => {
  const updateData = { ...req.body };
  
  const imageUrl = getFileUrl(req, "image", "imageUrl");
  if (imageUrl) {
    updateData.image = imageUrl;
  }

  const videoUrl = getFileUrl(req, "video", "videoUrl");
  if (videoUrl) {
    updateData.video = videoUrl;
  }
  
  if (updateData.exercises && typeof updateData.exercises === 'string') {
    updateData.exercises = updateData.exercises.split(',').map(e => e.trim());
  }

  const workout = await Workout.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
  });
  res.json(workout);
};

// DELETE
exports.deleteWorkout = async (req, res) => {
  await Workout.findByIdAndDelete(req.params.id);
  res.json({ msg: "Workout deleted" });
};