const Trainer = require("../models/Trainer");

const getImageUrl = (req) => {
  if (req.file) {
    if (req.file.path.startsWith("http")) return req.file.path;
    return `http://localhost:5000/uploads/${req.file.filename}`;
  }
  return req.body.imageUrl || undefined;
};

// GET ALL
exports.getTrainers = async (req, res) => {
  const trainers = await Trainer.find();
  res.json(trainers);
};

// GET SINGLE TRAINER
exports.getTrainerById = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);
    if (!trainer) return res.status(404).json({ msg: "Trainer not found" });
    res.json(trainer);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// CREATE A TRAINER
exports.createTrainer = async (req, res) => {
  try {
    const { name, expertise, availableTime, isActive } = req.body;
    const trainer = new Trainer({
      name,
      expertise,
      availableTime,
      isActive: isActive === "true" || isActive === true,
      image: getImageUrl(req), 
    });
    await trainer.save();
    res.status(201).json(trainer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE A TRAINER
exports.updateTrainer = async (req, res) => {
  try {
    const { name, expertise, availableTime, isActive } = req.body;
    let updateData = { name, expertise, availableTime, isActive: isActive === "true" || isActive === true };
    
    const imageUrl = getImageUrl(req);
    if (imageUrl) {
      updateData.image = imageUrl;
    }
    
    const updated = await Trainer.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE A TRAINER
exports.deleteTrainer = async (req, res) => {
  try {
    await Trainer.findByIdAndDelete(req.params.id);
    res.json({ message: "Trainer deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
