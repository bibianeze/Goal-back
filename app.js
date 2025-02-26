//afedayo;
//hIgk2RAYMsxSVhJN
//mongodb+srv://afedayo:hIgk2RAYMsxSVhJN@cluster0.rvfiy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const goalRoutes = require("./routes/goalRoutes");

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB

// Routes
app.use("/api/goals", goalRoutes);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
};

start();
// Start server
