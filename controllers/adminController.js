const Admin = require("../models/adminModel");
const Assignment = require("../models/assignmentModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register admin
exports.registerAdmin = async (req, res) => { 
  try {
    const { name, email, password } = req.body;
    const admin = await Admin.create({ name, email, password: await bcrypt.hash(password, 10) });
    res.status(201).json({ message: "Admin registered successfully", admin });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//login admin
exports.loginAdmin = async (req, res) => { 
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get assignments to taged
exports.getAssignments = async (req, res) => {
  try {
    // Log the admin ID to check if it's set correctly
    console.log("Admin ID:", req.admin.name);

    // Fetch assignments for the admin and populate the userId
    const assignments = await Assignment.find({ admin: req.admin.name })
      .populate("userId", "username"); // Specify the fields to populate
    
    // If no assignments are found, return a message
    if (!assignments.length) {
      return res.status(404).json({ message: "No assignments found." });
    }

    // Return the assignments
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//update assignments status
exports.updateAssignmentStatus = async (req, res) => {
  try {
    const { id, action } = req.params;
    const status = action === "accept" ? "accepted" : "rejected";
    const assignment = await Assignment.findByIdAndUpdate(id, { status }, { new: true });
    res.json({ message: `Assignment ${status}`, assignment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
