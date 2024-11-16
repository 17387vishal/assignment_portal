const express = require("express");
const { registerUser, loginUser, uploadAssignment, getAdmins } = require("../controllers/userController");
const { authenticateUser } = require("../middlewares/auth");

const router = express.Router();

//user routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/upload", authenticateUser, uploadAssignment);
router.get("/admins", authenticateUser, getAdmins);

module.exports = router;
