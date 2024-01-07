// Import necessary libraries and modules
const multer = require("multer");
const express = require("express");
const router = express.Router();
const File = require("../db"); // Adjust the path accordingly

// Configure Multer for file storage settings
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // Set the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Generate a unique filename for the uploaded file
  },
});

const upload = multer({ storage: storage }); // Create a Multer instance with the specified storage settings

// Handle POST request for file upload
router.post("/", upload.single("file"), async function (req, res) {
  try {
    // Create a new File instance with file details
    const file = new File({
      file: req.file.originalname, // Original filename
      path: req.file.path, // Store the file path
    });

    // Save the file details to the database
    await file.save();

    // Redirect to the home page after successful upload
    res.redirect("/");
  } catch (error) {
    // Handle errors during file upload
    console.error(`Server error: ${error}`);
    res.status(500).send("Error uploading file");
  }
});

// Handle GET request to render the page with a list of uploaded files
router.get("/", async (req, res) => {
  try {
    // Fetch all files from the database
    const files = await File.find();

    // Render the 'render' page with the list of files
    res.render("render", { files });
  } catch (error) {
    // Handle errors during file retrieval
    console.error(`Server error: ${error}`);
    res.status(500).send("Error fetching files");
  }
});

module.exports = router; // Export the router for use in other modules
