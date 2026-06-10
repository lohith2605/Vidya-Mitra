const fs = require("fs");
const path = require("path");
const College = require("../models/College");

const importCollegeData = async () => {
  const filePath = path.join(__dirname, "../data/colleges.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  let colleges;

  try {
    colleges = JSON.parse(raw);
  } catch (error) {
    throw new Error(`Failed to parse colleges.json: ${error.message}`);
  }

  if (!Array.isArray(colleges)) {
    throw new Error("colleges.json must contain a top-level array of college objects.");
  }

  try {
    await College.insertMany(colleges, { ordered: false });
  } catch (error) {
    if (error.code === 11000) {
      // ignore duplicate key insert errors
      return;
    }
    throw error;
  }
};

module.exports = importCollegeData;
