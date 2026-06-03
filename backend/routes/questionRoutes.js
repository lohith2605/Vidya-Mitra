const express = require("express");
const router = express.Router();
const { getQuestionsByLevel } = require("../controllers/questionController");

// Fetch questions for specific education level
router.get("/:level", getQuestionsByLevel);

module.exports = router;
