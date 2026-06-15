// Entry point for Vidya Mitra application
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const questionRoutes = require("./routes/questionRoutes");
const assessmentRoutes = require("./routes/assessmentRoutes");
const collegeRoutes = require("./routes/collegeRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Mount authentication routes
app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/assessment", assessmentRoutes);
app.use("/api/colleges", collegeRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
    res.send("Vidya Mitra Backend Running");
});

module.exports = app;
