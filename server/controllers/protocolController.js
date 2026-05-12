const WeeklyProtocol = require("../models/WeeklyProtocol");

// Get the saved protocol (we just fetch the first one for now as it's a global protocol)
exports.getProtocol = async (req, res) => {
  try {
    const protocol = await WeeklyProtocol.findOne();
    if (protocol) {
      res.json(protocol);
    } else {
      res.json(null);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Save or overwrite the protocol
exports.saveProtocol = async (req, res) => {
  try {
    const { schedule } = req.body;
    
    // Find the existing protocol, if any
    let protocol = await WeeklyProtocol.findOne();
    
    if (protocol) {
      protocol.schedule = schedule;
      await protocol.save();
    } else {
      protocol = new WeeklyProtocol({ schedule });
      await protocol.save();
    }
    
    res.status(200).json(protocol);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
