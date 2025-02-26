// routes/goalRoutes.js
const express = require("express");
const router = express.Router();
const {
  deletedGoal,
  editProgress,
  editGoals,
  completedGoals,
  ongoingGoals,
  allGoals,
  newGoal,
} = require("../controllers/goalController");

// Create a new goal
router.post("/", newGoal);

// Get all goals (ongoing and completed)
router.get("/", allGoals);

// Get ongoing goals (progress < 100)
router.get("/ongoing", ongoingGoals);

// Get completed goals (progress === 100)
router.get("/completed", completedGoals);

// Update an entire goal (edit title, description, and progress)
router.put("/:id", editGoals);

// Update only the progress of a goal
router.patch("/:id/progress", editProgress);

// Delete a goal by its id
router.delete("/:id", deletedGoal);

module.exports = router;
