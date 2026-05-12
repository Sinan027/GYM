const jwt = require("jsonwebtoken");
const User = require("../models/User.js");


exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log(`[JWT Verification] Extracting token: ${token.substring(0, 15)}...`);

      const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
      console.log(`[JWT Verification]  Token verified successfully for User ID: ${decoded.id}`);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (err) {
      console.log(`[JWT Verification]  Token verification failed: ${err.message}`);
      return res.status(401).json({ msg: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ msg: "No token, access denied" });
  }
};

exports.admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ msg: "Admin access only" });
  }
};

