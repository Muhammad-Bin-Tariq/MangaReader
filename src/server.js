const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Manga = require("./models/Manga");

require("dotenv").config();

// Initialize the app
const app = express();
const PORT = process.env.PORT || 3010;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(
    `mongodb+srv://MuhammadBinTariq:MBTFantastic@mangamango.u0jp9.mongodb.net/MangaMango?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("MongoDB connected!");
    console.log(
      `Connected to database: ${mongoose.connection.db.databaseName}`
    );
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// API Routes
// Get all mangas
app.get("/api/mangas", async (req, res) => {
  try {
    const mangas = await Manga.find();
    res.json(mangas);
  } catch (err) {
    res.status(500).json({ error: "Error fetching mangas" });
  }
});

app.get("/api/mangas/:id", async (req, res) => {
  const { id } = req.params; // Get the id from the request parameters
  try {
    // Query the manga collection for a manga with a custom id field
    const manga = await Manga.findOne({ id: id });

    if (!manga) {
      return res.status(404).json({ message: "Manga not found" });
    }
    res.json(manga); // Return the manga details
  } catch (err) {
    res.status(500).json({ error: "Error fetching manga by ID" });
  }
});

// Get a manga by Title
app.get("/api/mangas/title/:title", async (req, res) => {
  const { title } = req.params; // Get the title from the request parameters
  try {
    // Use a case-insensitive search for the title
    const manga = await Manga.findOne({
      title: { $regex: new RegExp(title, "i") },
    });

    if (!manga) {
      return res.status(404).json({ message: "Manga not found" });
    }
    res.json(manga); // Return the manga details
  } catch (err) {
    res.status(500).json({ error: "Error fetching manga by title" });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
