const mongoose = require("mongoose");
const dns = require("dns");

// Workaround: some local DNS resolvers refuse SRV queries from Node's resolver.
// Force known public DNS servers so `dns.resolveSrv` succeeds for mongodb+srv.
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (err) {
  // If setServers isn't available or fails, log but continue; mongoose will attempt resolution.
  console.warn("Could not set DNS servers:", err && err.message);
}

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;