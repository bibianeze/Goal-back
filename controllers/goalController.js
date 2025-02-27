const Goal = require("../models/Goal");

// ============================

const newGoal = async (req, res) => {
  try {
    const { title, description, progress } = req.body;
    const goal = new Goal({ title, description, progress });
    const savedGoal = await goal.save();
    res.status(201).json(savedGoal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//   =========================

const allGoals = async (req, res) => {
  try {
    const goals = await Goal.find();
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//   =========================

const getGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).json({ error: "Goal not found" });
    res.status(200).json(goal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//   =========================

const ongoingGoals = async (req, res) => {
  try {
    const ongoingGoals = await Goal.find({ progress: { $lt: 100 } });
    console.log("Ongoing goals retrieved:", ongoingGoals);
    res.status(200).json(ongoingGoals);
  } catch (error) {
    console.error("Error in ongoingGoals endpoint:", error);
    res.status(500).json({ error: error.message });
  }
};

//   ==========================

const completedGoals = async (req, res) => {
  try {
    const completedGoals = await Goal.find({ progress: 100 });
    res.status(200).json(completedGoals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ============================

const editGoals = async (req, res) => {
  try {
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedGoal) return res.status(404).json({ error: "Goal not found" });
    res.status(200).json(updatedGoal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//   ==========================

const editProgress = async (req, res) => {
  try {
    const { progress } = req.body;
    if (progress === undefined) {
      return res.status(400).json({ error: "Progress value is required" });
    }
    const updatedGoal = await Goal.findByIdAndUpdate(
      req.params.id,
      { progress },
      { new: true }
    );
    if (!updatedGoal) return res.status(404).json({ error: "Goal not found" });
    res.status(200).json(updatedGoal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//   ===========================

const deletedGoal = async (req, res) => {
  try {
    const deletedGoal = await Goal.findByIdAndDelete(req.params.id);
    if (!deletedGoal) return res.status(404).json({ error: "Goal not found" });
    res.status(200).json({ message: "Goal deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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
