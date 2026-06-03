const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("MongoDB Connection Error:", error.message);
    console.log("----------------------------------------------------------------");
    console.log("⚠️  NOTICE: Entering Temporary In-Memory Bypass Mode.");
    console.log("You can log in using the temporary credentials:");
    console.log("   Username: admin");
    console.log("   Password: password123");
    console.log("Registration will also temporarily store users in memory.");
    console.log("----------------------------------------------------------------");
  }
};

module.exports = connectDB;