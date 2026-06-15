const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const College = require("../models/College");
const importCollegeData = require("../utils/importCollegeData");

const escapeRegex = (string) => {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
};

// Ensure that database has been seeded before query
const ensureCollegeSeed = async () => {
  const count = await College.countDocuments();
  if (count === 0) {
    console.log("College collection empty. Seeding colleges from colleges.json...");
    await importCollegeData();
    console.log("College data seeded successfully.");
  }
};

// Sync Mongoose DB to colleges.json file
const syncCollegesJson = async () => {
  try {
    const colleges = await College.find().sort({ collegeName: 1 }).lean();
    const formattedColleges = colleges.map((c) => ({
      collegeName: c.collegeName || "",
      address: c.address || "",
      district: c.district || "",
      type: c.type || "",
      office: c.office || "",
      phoneNumber: c.phoneNumber || "",
    }));
    const filePath = path.join(__dirname, "../data/colleges.json");
    fs.writeFileSync(filePath, JSON.stringify(formattedColleges, null, 2), "utf-8");
    console.log("colleges.json synced successfully with Mongoose DB.");
  } catch (error) {
    console.error("Failed to sync colleges.json:", error.message);
  }
};

// POST /api/admin/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    if (email === "admin@vidyamitra.com" && password === "vidyamitra123") {
      const token = jwt.sign(
        { email, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.status(200).json({
        success: true,
        token,
        message: "Admin login successful",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid Admin Credentials",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/admin/colleges
exports.getColleges = async (req, res) => {
  try {
    await ensureCollegeSeed();
    const colleges = await College.find().sort({ collegeName: 1 }).lean();
    return res.status(200).json({
      success: true,
      colleges,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch colleges.",
    });
  }
};

// POST /api/admin/colleges
exports.addCollege = async (req, res) => {
  try {
    await ensureCollegeSeed();
    const { collegeName, address, district, type, office, phoneNumber } = req.body;

    // Field validation
    if (!collegeName || !address || !district || !type || !office || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Duplicate submission check
    const existing = await College.findOne({
      collegeName: { $regex: new RegExp("^" + escapeRegex(collegeName.trim()) + "$", "i") },
      district: { $regex: new RegExp("^" + escapeRegex(district.trim()) + "$", "i") },
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "A college with this name in this district already exists.",
      });
    }

    const newCollege = await College.create({
      collegeName: collegeName.trim(),
      address: address.trim(),
      district: district.trim(),
      type: type.trim(),
      office: office.trim(),
      phoneNumber: phoneNumber.trim(),
    });

    // Sync file system
    await syncCollegesJson();

    return res.status(201).json({
      success: true,
      college: newCollege,
      message: "College added successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to add college.",
    });
  }
};

// PUT /api/admin/colleges/:id
exports.editCollege = async (req, res) => {
  try {
    await ensureCollegeSeed();
    const { id } = req.params;
    const { collegeName, address, district, type, office, phoneNumber } = req.body;

    // Field validation
    if (!collegeName || !address || !district || !type || !office || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const college = await College.findById(id);
    if (!college) {
      return res.status(404).json({
        success: false,
        message: "College not found.",
      });
    }

    // Duplicate submission check (excluding current college)
    const existing = await College.findOne({
      _id: { $ne: id },
      collegeName: { $regex: new RegExp("^" + escapeRegex(collegeName.trim()) + "$", "i") },
      district: { $regex: new RegExp("^" + escapeRegex(district.trim()) + "$", "i") },
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Another college with this name in this district already exists.",
      });
    }

    college.collegeName = collegeName.trim();
    college.address = address.trim();
    college.district = district.trim();
    college.type = type.trim();
    college.office = office.trim();
    college.phoneNumber = phoneNumber.trim();

    const updatedCollege = await college.save();

    // Sync file system
    await syncCollegesJson();

    return res.status(200).json({
      success: true,
      college: updatedCollege,
      message: "College updated successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update college.",
    });
  }
};

// DELETE /api/admin/colleges/:id
exports.deleteCollege = async (req, res) => {
  try {
    await ensureCollegeSeed();
    const { id } = req.params;

    const college = await College.findById(id);
    if (!college) {
      return res.status(404).json({
        success: false,
        message: "College not found.",
      });
    }

    await College.findByIdAndDelete(id);

    // Sync file system
    await syncCollegesJson();

    return res.status(200).json({
      success: true,
      message: "College deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete college.",
    });
  }
};
