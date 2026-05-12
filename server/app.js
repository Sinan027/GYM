const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const connectDB = require("./config/mongodb");

const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const nutritionRoutes = require("./routes/nutritionRoutes");
const programRoutes = require("./routes/program");
const goalsRoutes = require("./routes/goalsRoutes");
const trainerRoutes = require("./routes/trainerRoutes");
const progressRoutes = require("./routes/progressRoutes");
const protocolRoutes = require("./routes/protocolRoutes");
const exerciseBankRoutes = require("./routes/exerciseBankRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// --- GLOBAL BACKEND API LOGGING ---
app.use((req, res, next) => {
  console.log(`\n[Backend]  Incoming Request: ${req.method} ${req.originalUrl}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('[Backend]  Request Body:', JSON.stringify(req.body, null, 2));
  }
  next();
});
// ----------------------------------

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/admin/users", require("./routes/adminUserRoutes"));
app.use("/api/workouts", require("./routes/workoutRoutes"));
app.use("/api/blogs", blogRoutes);
app.use("/api/users", userRoutes);
app.use("/api/nutrition", nutritionRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/goals", goalsRoutes);
app.use("/api/trainers", trainerRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/protocol", protocolRoutes);
app.use("/api/exercise-bank", exerciseBankRoutes);
app.use("/api/community", require("./routes/communityRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/purchases", require("./routes/purchaseRoutes"));
app.use("/api/protein-powders", require("./routes/proteinPowderRoutes"));
app.use("/api/bmi", require("./routes/bmiRoutes"));

app.listen(5000, () => console.log("Server running on port 5000"));