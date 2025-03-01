// Import the Goal model to interact with the MongoDB database
const Goal = require("../models/Goal");

// ============================
// Create a new goal
const newGoal = async (req, res) => {
  try {
    // Extract title, description, and progress from the request body
    const { title, description, progress } = req.body;

    // Create a new Goal document with the provided data
    const goal = new Goal({ title, description, progress });

    // Save the goal to the database
    const savedGoal = await goal.save();

    // Send a success response with the saved goal
    res.status(201).json(savedGoal);
  } catch (error) {
    // Handle errors (e.g., validation issues)
    res.status(400).json({ error: error.message });
  }
};

// ============================
// Get all goals
const allGoals = async (req, res) => {
  try {
    // Retrieve all goal documents from the database
    const goals = await Goal.find();

    // Send the retrieved goals as a response
    res.status(200).json(goals);
  } catch (error) {
    // Handle any errors (e.g., database issues)
    res.status(500).json({ error: error.message });
  }
};

// ============================
// Get a single goal by ID
const getGoal = async (req, res) => {
  try {
    // Find a goal by its ID (provided in the request parameters)
    const goal = await Goal.findById(req.params.id);

    // If the goal doesn't exist, return a 404 error
    if (!goal) return res.status(404).json({ error: "Goal not found" });

    // Send the retrieved goal as a response
    res.status(200).json(goal);
  } catch (error) {
    // Handle errors (e.g., invalid ID format)
    res.status(500).json({ error: error.message });
  }
};

// ============================
// Get all ongoing goals (progress < 100)
const ongoingGoals = async (req, res) => {
  try {
    // Find goals where progress is less than 100
    const ongoingGoals = await Goal.find({ progress: { $lt: 100 } });

    // Log retrieved ongoing goals (for debugging)
    console.log("Ongoing goals retrieved:", ongoingGoals);

    // Send the ongoing goals as a response
    res.status(200).json(ongoingGoals);
  } catch (error) {
    console.error("Error in ongoingGoals endpoint:", error);
    res.status(500).json({ error: error.message });
  }
};

// ============================
// Get all completed goals (progress === 100)
const completedGoals = async (req, res) => {
  try {
    // Find goals where progress is exactly 100
    const completedGoals = await Goal.find({ progress: 100 });

    // Send the completed goals as a response
    res.status(200).json(completedGoals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ============================
// Edit an existing goal by ID
const editGoals = async (req, res) => {
  try {
    // Find a goal by ID and update it with new data from the request body
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document instead of the old one
    });

    // If the goal doesn't exist, return a 404 error
    if (!updatedGoal) return res.status(404).json({ error: "Goal not found" });

    // Send the updated goal as a response
    res.status(200).json(updatedGoal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ============================
// Update only the progress field of a goal
const editProgress = async (req, res) => {
  try {
    // Extract progress value from the request body
    const { progress } = req.body;

    // Ensure progress is provided
    if (progress === undefined) {
      return res.status(400).json({ error: "Progress value is required" });
    }

    // Find the goal by ID and update its progress
    const updatedGoal = await Goal.findByIdAndUpdate(
      req.params.id,
      { progress }, // Update only the progress field
      { new: true } // Return the updated document
    );

    // If the goal doesn't exist, return a 404 error
    if (!updatedGoal) return res.status(404).json({ error: "Goal not found" });

    // Send the updated goal as a response
    res.status(200).json(updatedGoal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ============================
// Delete a goal by ID
const deletedGoal = async (req, res) => {
  try {
    // Find and delete a goal by its ID
    const deletedGoal = await Goal.findByIdAndDelete(req.params.id);

    // If the goal doesn't exist, return a 404 error
    if (!deletedGoal) return res.status(404).json({ error: "Goal not found" });

    // Send a success message
    res.status(200).json({ message: "Goal deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ============================
// Export all the controller functions for use in routes
module.exports = {
  newGoal,
  allGoals,
  ongoingGoals,
  completedGoals,
  editGoals,
  editProgress,
  deletedGoal,
  getGoal,
};
