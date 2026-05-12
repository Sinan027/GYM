const BMIHistory = require("../models/BMIHistory");

exports.saveBMI = async (req, res) => {
  try {
    const { weight, height, bmi, status } = req.body;
    const userId = req.user.id;

    console.log(`[BMI Controller] Saving BMI for user: ${userId}`);
    console.log(`[BMI Controller] Data: Weight=${weight}, Height=${height}, BMI=${bmi}, Status=${status}`);

    const newRecord = await BMIHistory.create({
      user: userId,
      weight,
      height,
      bmi,
      status
    });

    res.status(201).json({ message: "BMI saved successfully", record: newRecord });
  } catch (error) {
    console.error("[BMI Controller Error]", error);
    res.status(500).json({ message: "Failed to save BMI record" });
  }
};

exports.getBMIHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(`[BMI Controller] Fetching BMI history for user: ${userId}`);

    const history = await BMIHistory.find({ user: userId }).sort({ date: -1 });
    res.status(200).json(history);
  } catch (error) {
    console.error("[BMI Controller Error]", error);
    res.status(500).json({ message: "Failed to fetch BMI history" });
  }
};

// ADMIN: Get all users' BMI history
exports.getAllBMIHistory = async (req, res) => {
  try {
    console.log(`[BMI Controller] ADMIN fetching all BMI history...`);
    const history = await BMIHistory.find()
      .populate("user", "username email")
      .sort({ date: -1 });
    res.status(200).json(history);
  } catch (error) {
    console.error("[BMI Controller Error]", error);
    res.status(500).json({ message: "Failed to fetch all BMI history" });
  }
};

// ADMIN: Delete a BMI record
exports.deleteBMIRecord = async (req, res) => {
  try {
    const recordId = req.params.id;
    console.log(`[BMI Controller] ADMIN deleting BMI record: ${recordId}`);
    
    await BMIHistory.findByIdAndDelete(recordId);
    res.status(200).json({ message: "BMI record deleted successfully" });
  } catch (error) {
    console.error("[BMI Controller Error]", error);
    res.status(500).json({ message: "Failed to delete BMI record" });
  }
};
