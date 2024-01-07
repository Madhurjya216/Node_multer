const mongoose = require('mongoose');

mongoose.connect(process.env.DBCONNECTION);

const fileSchema = new mongoose.Schema({
  file: String,
  path: String, // Add this field to store the file path
});

const File = mongoose.model("File", fileSchema);


module.exports = File;