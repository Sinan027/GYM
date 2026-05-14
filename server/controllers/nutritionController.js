const Nutrition = require("../models/Nutrition");

// ✅ GET all nutrition
exports.getAllNutrition = async (req, res) => {
  try {
    const data = await Nutrition.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET single nutrition
exports.getNutritionById = async (req, res) => {
  try {
    const item = await Nutrition.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Nutrition not found" });
    }

    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getImageUrl = (req) => {
  if (req.file) {
    if (req.file.path.startsWith("http")) return req.file.path;
    return `${process.env.BACKEND_URL}/uploads/${req.file.filename}`;
  }
  return req.body.imageUrl || undefined;
};

exports.createNutrition = async (req, res) => {
  try {
    const { name, calories, protein, carbs, fat } = req.body;

    const newItem = new Nutrition({
      name,
      calories: Number(calories),
      protein: Number(protein),
      carbs: Number(carbs),
      fat: Number(fat) || 0,
      image: getImageUrl(req),
    });

    const saved = await newItem.save();

    res.status(201).json(saved);
  } catch (err) {
    console.error("CREATE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ UPDATE nutrition
exports.updateNutrition = async (req, res) => {
  try {
    const data = {
      ...req.body,
      calories: Number(req.body.calories),
      protein: Number(req.body.protein),
      carbs: Number(req.body.carbs),
    };

    const imageUrl = getImageUrl(req);
    if (imageUrl) {
      data.image = imageUrl;
    }

    const updated = await Nutrition.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
// ✅ DELETE nutrition
exports.deleteNutrition = async (req, res) => {
  try {
    const deleted = await Nutrition.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Nutrition not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};