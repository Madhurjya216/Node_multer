// Import necessary libraries and modules
require("dotenv").config();
const express = require("express");
const port = process.env.PORT
const app = express();
const path = require("path");
const route = require("./router/route");
const cors = require("cors");

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse incoming requests with urlencoded payloads
app.use(express.urlencoded({ extended: false }));

// Serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Set up the view engine and views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Handle GET request for the home page
app.get("/", (req, res) => {
  res.render("index"); // Render the "index" view
});

// Use the same router for "/upload" and "/render" paths
app.use("/upload", route);
app.use("/render", route);

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server listening`);
});
