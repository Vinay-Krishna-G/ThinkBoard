const express = require("express");
const notesRoutes = require("./routes/notesRoutes.js");
const connectDB = require("./config/db.js");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env file

console.log(process.env.MONGODB_URI); // Log the MongoDB URI for debugging
const app = express();

connectDB();

app.use("/api/notes", notesRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
