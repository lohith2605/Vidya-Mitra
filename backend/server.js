// Server bootstrap for Vidya Mitra
require("dotenv").config();
// Log whether JWT_SECRET is loaded (do not print the full secret in production)
console.log('[Server] JWT_SECRET present:', !!process.env.JWT_SECRET, 'length:', process.env.JWT_SECRET ? process.env.JWT_SECRET.length : 0);
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

// Connect to MongoDB before accepting requests.
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server because MongoDB connection failed:", err.message);
    process.exit(1);
  });
