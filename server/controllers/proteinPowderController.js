const ProteinPowder = require("../models/ProteinPowder");

const getImageUrl = (req) => {
  if (req.file) {
    if (req.file.path.startsWith("http")) return req.file.path;
    return `http://localhost:5000/uploads/${req.file.filename}`;
  }
  return req.body.imageUrl || undefined;
};

// GET all
exports.getAllProteinPowders = async (req, res) => {
  try {
    const data = await ProteinPowder.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single
exports.getProteinPowderById = async (req, res) => {
  try {
    const item = await ProteinPowder.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE
exports.createProteinPowder = async (req, res) => {
  try {
    const { name, brand, price, description, inStock } = req.body;

    const newItem = new ProteinPowder({
      name,
      brand,
      price: Number(price),
      description,
      inStock: inStock === "true" || inStock === true,
      image: getImageUrl(req),
    });

    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
exports.updateProteinPowder = async (req, res) => {
  try {
    const { name, brand, price, description, inStock } = req.body;
    
    const data = {
      name,
      brand,
      price: Number(price),
      description,
      inStock: inStock === "true" || inStock === true,
    };

    const imageUrl = getImageUrl(req);
    if (imageUrl) {
      data.image = imageUrl;
    }

    const updated = await ProteinPowder.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
exports.deleteProteinPowder = async (req, res) => {
  try {
    const deleted = await ProteinPowder.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
