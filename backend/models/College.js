const mongoose = require("mongoose");

const CollegeSchema = new mongoose.Schema(
  {
    collegeName: { type: String, required: true },
    address: { type: String, default: "Not Available" },
    district: { type: String, default: "Not Available" },
    type: { type: String, default: "Not Available" },
    office: { type: String, default: "Not Available" },
    phoneNumber: { type: String, default: "Not Available" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("College", CollegeSchema);
