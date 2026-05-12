const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
  try {
    const { trainer, sessionDate, notes } = req.body;
    
    // User is attached by the 'protect' middleware
    const user = req.user._id;

    const booking = await Booking.create({
      user,
      trainer,
      sessionDate,
      notes
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate("trainer", "name image expertise");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("trainer", "name");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!booking) return res.status(404).json({ msg: "Booking not found" });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ msg: "Booking deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
