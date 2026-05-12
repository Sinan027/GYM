const Purchase = require("../models/Purchase");

exports.createPurchase = async (req, res) => {
  try {
    const { itemId, itemType, paymentMethod, amount } = req.body;
    
    const purchase = await Purchase.create({
      user: req.user._id,
      itemId,
      itemType: itemType === 'powder' ? 'ProteinPowder' : 'Program',
      paymentMethod,
      amount
    });

    res.status(201).json(purchase);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getUserPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find({ user: req.user._id }).populate("itemId");
    res.json(purchases);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getAllPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find()
      .populate("user", "name email")
      .populate("itemId");
    res.json(purchases);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
