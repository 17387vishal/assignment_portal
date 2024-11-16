const User = require("../models/userModel");
const Admin = require("../models/adminModel");
const Assignment = require("../models/assignmentModel");
const jwt = require("jsonwebtoken");

// Middleware to authenticate the user from JWT
exports.authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  
  if (!token) {
    return res.status(403).json({ error: "Token is required" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
    req.user = decoded;  // Store the decoded user data in the request object
    next();
  });
};

// User registration
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const user = await User.create({ username, email, password });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// User login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate and send JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//upload assignments
exports.uploadAssignment = async (req, res) => {
  const { task, admin, username } = req.body;
  const userId = req.user.id; // Use authenticated user's id

  // Validation for missing fields
  if (!task || !admin) {
    return res.status(400).json({ error: "Task and admin name are required." });
  }

  try {
    // Check if the admin with the provided name exists in the Admin collection
    const adminData = await Admin.findOne({ name: admin });
    if (!adminData) {
      return res.status(404).json({ error: "Admin not found." });
    }

    // Create the assignment with userId, adminId (adminData._id), and task
    const assignment = await Assignment.create({
      userId,
      admin: adminData.name,  // Save the admin's name in the admin field
      task,
      username,
    });

    // Return success response
    res.status(201).json({ message: "Assignment uploaded successfully", assignment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Get list of admins
exports.getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({}, "name email");
    res.json(admins);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
