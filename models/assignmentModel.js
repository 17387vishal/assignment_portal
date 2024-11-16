const mongoose = require("mongoose");

//assignment schema with validations
const assignmentSchema = mongoose.Schema(
  {
    username:{
      type: String,
      ref:'User',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    task: {
      type: String,
      required: [true, "Task is required"],
      minlength: [5, "Task description must be at least 5 characters long"],
      maxlength: [500, "Task description must not exceed 500 characters"],
      trim: true, // Removes leading and trailing whitespace
    },
    admin: {
      type: String,
      ref: "Admin",
     required: [true, "Admin name is required"],
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Export the assignment model
module.exports = mongoose.model("Assignment", assignmentSchema);
