const express = require("express");
const { registerAdmin, loginAdmin, getAssignments, updateAssignmentStatus } = require("../controllers/adminController");
const { authenticateAdmin } = require("../middlewares/auth");

const router = express.Router();

// admin routes
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/assignments", authenticateAdmin, getAssignments);
router.post("/assignments/:id/:action", authenticateAdmin, updateAssignmentStatus);

module.exports = router;
