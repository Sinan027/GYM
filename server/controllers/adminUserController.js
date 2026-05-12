const User = require("../models/User");

// GET ALL USERS
exports.getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// DELETE USER
exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ msg: "User deleted" });
};

// UPDATE USER (optional admin edit)
exports.updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(user);
};