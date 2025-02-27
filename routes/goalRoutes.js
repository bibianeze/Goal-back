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
  getGoal,
} = require("../controllers/goalController");

// Create a new goal
router.post("/", newGoal);

// Static routes should come before the parameterized ones:
router.get("/ongoing", ongoingGoals);
router.get("/completed", completedGoals);

// List all goals (this can be a catch-all for GET on "/")
router.get("/", allGoals);

// GET a single goal by id
router.get("/:id", getGoal);

// Update an entire goal
router.put("/:id", editGoals);

// Update only the progress of a goal
router.patch("/:id/progress", editProgress);

// Delete a goal by its id
router.delete("/:id", deletedGoal);

module.exports = router;
