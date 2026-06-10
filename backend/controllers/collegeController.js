const mongoose = require("mongoose");
const College = require("../models/College");
const importCollegeData = require("../utils/importCollegeData");

const sanitizeRegex = (value) => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

const ensureCollegeSeed = async () => {
  if (mongoose.connection.readyState !== 1) return;

  const count = await College.countDocuments();
  if (count === 0) {
    console.log("College collection empty. Seeding colleges from colleges.json...");
    await importCollegeData();
    console.log("College data seeded successfully.");
  }
};

exports.getColleges = async (req, res) => {
  try {
    await ensureCollegeSeed();
    const { search, district, type } = req.query;
    const query = {};

    if (district) {
      const districts = Array.isArray(district) ? district : [district];
      query.district = { $in: districts.map((item) => new RegExp(sanitizeRegex(item.trim()), "i")) };
    }

    if (type) {
      const types = Array.isArray(type) ? type : [type];
      query.type = { $in: types.map((item) => new RegExp(sanitizeRegex(item.trim()), "i")) };
    }

    if (search) {
      const escaped = sanitizeRegex(search.trim());
      query.$or = [
        { collegeName: { $regex: escaped, $options: "i" } },
        { district: { $regex: escaped, $options: "i" } },
        { type: { $regex: escaped, $options: "i" } },
      ];
    }

    const colleges = await College.find(query).sort({ collegeName: 1 }).lean();
    return res.status(200).json(colleges);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Unable to fetch colleges." });
  }
};

exports.getCollegeById = async (req, res) => {
  try {
    await ensureCollegeSeed();
    const college = await College.findById(req.params.id).lean();
    if (!college) {
      return res.status(404).json({ message: "College not found." });
    }
    return res.status(200).json(college);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Unable to fetch college details." });
  }
};

exports.getCollegeFilters = async (req, res) => {
  try {
    await ensureCollegeSeed();
    const districts = await College.distinct("district").then((values) => values.filter(Boolean).sort());
    const types = await College.distinct("type").then((values) => values.filter(Boolean).sort());
    return res.status(200).json({ districts, types });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Unable to fetch college filters." });
  }
};
