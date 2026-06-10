const express = require("express");
const router = express.Router();
const {
  getColleges,
  getCollegeById,
  getCollegeFilters,
} = require("../controllers/collegeController");

router.get("/filters", getCollegeFilters);
router.get("/:id", getCollegeById);
router.get("/", getColleges);

module.exports = router;
