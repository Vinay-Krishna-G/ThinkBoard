const express = require("express");
const notesRoutes = require("./routes/notesRoutes.js");
const connectDB = require("./config/db.js");
const dotenv = require("dotenv");
const rateLimiter = require("./middlewares/rateLimiter.js");

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

app.use(express.json()); // Middleware to parse JSON bodies
app.use(rateLimiter); // Apply rate limiting middleware

app.use("/api/notes", notesRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
