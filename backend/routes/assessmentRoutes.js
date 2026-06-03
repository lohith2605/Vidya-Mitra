const express = require("express");
const router = express.Router();
const { submitAssessment, getAssessmentHistory } = require("../controllers/assessmentController");
const authMiddleware = require("../middleware/authMiddleware");

// Submit quiz answers (Requires authentication)
router.post("/submit", authMiddleware, submitAssessment);

// Fetch logged-in user's quiz history (Requires authentication)
router.get("/history", authMiddleware, getAssessmentHistory);

module.exports = router;
