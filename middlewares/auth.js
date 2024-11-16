const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Admin = require("../models/adminModel");

/**
 * Middleware to authenticate a user.
 */
exports.authenticateUser = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    req.user = user; // Attach user object to the request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

// middleware authenticate the admin
exports.authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Get the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the token

    const admin = await Admin.findById(decoded.id); // Find admin by id
    if (!admin) {
      return res.status(401).json({ error: "Admin not found." });
    }

    req.admin = admin; // Set the admin to the request object
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized." });
  }
};
