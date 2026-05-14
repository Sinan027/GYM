const Program = require("../models/Program");

const getImageUrl = (req) => {
  if (req.file) {
    if (req.file.path.startsWith("http")) return req.file.path;
    return `${process.env.BACKEND_URL}/uploads/${req.file.filename}`;
  }
  return req.body.imageUrl || undefined;
};

// GET ALL
exports.getPrograms = async (req, res) => {
  const data = await Program.find();
  res.json(data);
};

// GET SINGLE
exports.getProgramById = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) {
      return res.status(404).json({ msg: "Program not found" });
    }
    res.json(program);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// POST
exports.createProgram = async (req, res) => {
  try {
    const programData = { ...req.body };
    const imageUrl = getImageUrl(req);
    if (imageUrl) {
      programData.image = imageUrl;
    }
    const newData = await Program.create(programData);
    res.json(newData);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// PUT
exports.updateProgram = async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    // Remove _id to prevent MongoDB immutable field error!
    if (updateData._id) {
      delete updateData._id;
    }
    
    const imageUrl = getImageUrl(req);
    if (imageUrl) {
      updateData.image = imageUrl;
    }

    const updated = await Program.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// DELETE
exports.deleteProgram = async (req, res) => {
  await Program.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};