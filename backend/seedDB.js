require("dotenv").config();
const connectDB = require("./config/db");
const College = require("./models/College");
const importCollegeData = require("./utils/importCollegeData");

(async () => {
  try {
    await connectDB();
    console.log("Clearing existing colleges...");
    await College.deleteMany({});
    console.log("Colleges cleared. Importing from colleges.json...");
    await importCollegeData();
    const count = await College.countDocuments();
    console.log(`✅ Successfully imported ${count} colleges from colleges.json`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Failed to seed colleges:", err.message);
    process.exit(1);
  }
})();
