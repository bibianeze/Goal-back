// Import Express to create a router for handling goal-related routes
const express = require("express");
const router = express.Router();

// Import goal controller functions from the goalController file
const {
  deletedGoal,
  editProgress,
  editGoals,
  completedGoals,
  ongoingGoals,
  allGoals,
  newGoal,
  getGoal,
} = require("../controllers/goalController");

// ============================
// Route Definitions
// ============================

// Create a new goal
router.post("/", newGoal);

// Retrieve all ongoing goals (progress < 100)
router.get("/ongoing", ongoingGoals);

// Retrieve all completed goals (progress === 100)
router.get("/completed", completedGoals);

// Retrieve all goals
router.get("/", allGoals);

// Retrieve a single goal by its ID
router.get("/:id", getGoal);

// Update an entire goal by its ID
router.put("/:id", editGoals);

// Update only the progress of a goal using PATCH (partial update)
router.patch("/:id/progress", editProgress);

// Delete a goal by its ID
router.delete("/:id", deletedGoal);

// ============================
// Export the router to be used in other parts of the app
module.exports = router;
