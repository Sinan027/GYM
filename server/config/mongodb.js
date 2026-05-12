const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    // --- DATABASE DATA FLOW LOGGING ---
    mongoose.set('debug', true);
    // ----------------------------------

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("DB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
