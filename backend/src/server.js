const express = require("express");
const notesRoutes = require("./routes/notesRoutes.js");
const connectDB = require("./config/db.js");
const dotenv = require("dotenv");
const rateLimiter = require("./middlewares/rateLimiter.js");
const cors = require("cors");

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5001;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json()); // Middleware to parse JSON bodies
app.use(rateLimiter); // Apply rate limiting middleware

app.use("/api/notes", notesRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exit the process if database connection fails
  });
