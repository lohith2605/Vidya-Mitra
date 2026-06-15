const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const adminMiddleware = require("../middleware/adminMiddleware");

// Authentication Route
router.post("/login", adminController.login);

// College Management Routes (Protected by adminMiddleware)
router.get("/colleges", adminMiddleware, adminController.getColleges);
router.post("/colleges", adminMiddleware, adminController.addCollege);
router.put("/colleges/:id", adminMiddleware, adminController.editCollege);
router.delete("/colleges/:id", adminMiddleware, adminController.deleteCollege);

module.exports = router;
