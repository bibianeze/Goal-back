// Import required dependencies
const express = require("express"); // Express framework for building the server
const mongoose = require("mongoose"); // Mongoose for interacting with MongoDB
const cors = require("cors"); // CORS middleware to allow cross-origin requests
require("dotenv").config(); // Load environment variables from a .env file

// Import route handlers
const goalRoutes = require("./routes/goalRoutes");

const app = express(); // Initialize Express application
const port = process.env.PORT || 4000; // Set port, default to 4000 if not provided in environment variables

// Middleware
// app.use(cors()); // Original CORS configuration (commented out)
app.use(cors({ origin: "*" })); // Allow requests from any origin (not recommended for production)

app.use(express.json()); // Middleware to parse incoming JSON requests

// Connect to MongoDB and Start the Server
const start = async () => {
  try {
    // Connect to MongoDB using Mongoose, URL is stored in environment variables
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    // Start the Express server and listen on the specified port
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error(err); // Log errors if MongoDB connection fails
  }
};

// Define routes
app.use("/api/goals", goalRoutes); // Use goalRoutes for handling "/api/goals" endpoints

start(); // Call the start function to initiate database connection and start the server
