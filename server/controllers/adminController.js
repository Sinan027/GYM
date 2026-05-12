const User = require("../models/User");
const Workout = require("../models/Workout");
const Program = require("../models/Program");
const CommunityPost = require("../models/CommunityPost");
const Broadcast = require("../models/Broadcast");

// @desc    Get dashboard statistics
// @route   GET /api/admin/dashboard-stats
// @access  Private/Admin
exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalWorkouts = await Workout.countDocuments();
    const totalPrograms = await Program.countDocuments();
    const totalCommunityPosts = await CommunityPost.countDocuments();

    // Get 5 most recent users
    const recentUsers = await User.find({})
      .sort({ createdAt: -1 })
      .select("-password")
      .limit(5);

    // Get latest broadcasts
    const broadcasts = await Broadcast.find({})
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalUsers,
      totalWorkouts,
      totalPrograms,
      totalCommunityPosts,
      recentUsers,
      broadcasts,
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// @desc    Create a system broadcast
// @route   POST /api/admin/broadcast
// @access  Private/Admin
exports.createBroadcast = async (req, res) => {
  try {
    const { message, type } = req.body;
    if (!message) return res.status(400).json({ msg: "Message is required" });

    const broadcast = new Broadcast({ message, type });
    await broadcast.save();

    res.status(201).json({ msg: "Broadcast created", broadcast });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// @desc    Toggle block status of a user
// @route   PUT /api/admin/users/:id/block
// @access  Private/Admin
exports.toggleBlockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (user.role === "admin") {
      return res.status(400).json({ msg: "Cannot block an admin" });
    }

    user.isBlocked = !user.isBlocked;
    await user.save();

    res.json({ msg: `User ${user.isBlocked ? 'blocked' : 'unblocked'} successfully`, user });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// @desc    Soft delete (remove) a user
// @route   PUT /api/admin/users/:id/remove
// @access  Private/Admin
exports.removeUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    if (user.role === "admin") return res.status(400).json({ msg: "Cannot remove an admin" });

    user.isDeleted = true;
    await user.save();
    res.json({ msg: "User removed successfully", user });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// @desc    Restore a soft-deleted user
// @route   PUT /api/admin/users/:id/restore
// @access  Private/Admin
exports.restoreUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.isDeleted = false;
    await user.save();
    res.json({ msg: "User restored successfully", user });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// @desc    Hard delete a user permanently
// @route   DELETE /api/admin/users/:id/hard-delete
// @access  Private/Admin
exports.hardDeleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    if (user.role === "admin") return res.status(400).json({ msg: "Cannot delete an admin" });

    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: "User permanently deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// @desc    Delete a system broadcast
// @route   DELETE /api/admin/broadcast/:id
// @access  Private/Admin
exports.deleteBroadcast = async (req, res) => {
  try {
    const broadcast = await Broadcast.findById(req.params.id);
    if (!broadcast) return res.status(404).json({ msg: "Broadcast not found" });

    await Broadcast.findByIdAndDelete(req.params.id);
    res.json({ msg: "Broadcast deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
