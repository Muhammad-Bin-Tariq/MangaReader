const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Manga = require("./models/Manga");
const User = require("./models/User");

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

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins or specify your frontend URL
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

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

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log("Registering user:", username);

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.error("Username already exists:", username);
      return res.status(400).json({ message: "Username already taken" });
    }

    const newUser = new User({ username, password });
    await newUser.save();
    console.log("User registered successfully:", username);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in /signup route:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Health check for /signup route
app.get("/signup", (req, res) => {
  res.status(200).json({ message: "Signup route is working!" });
});

app.get("/login", (req, res) => {
  res.status(200).json({ message: "Login route is working!" });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate password (ensure you're not using plain-text passwords in production)
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful!" });
  } catch (error) {
    console.error("Error in /login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to fetch user by username
app.get("/api/users/:username", async (req, res) => {
  const { username } = req.params;

  try {
    // Find user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Return user data along with _id
    res.json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/api/library/add", async (req, res) => {
  const { userId, mangaId } = req.body;

  console.log("Request Body:", req.body); // Add this line to log the request

  try {
    const user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    // Check if manga already in the library
    const mangaExists = user.library.some(
      (item) => item.manga.toString() === mangaId
    );
    if (mangaExists) {
      return res
        .status(400)
        .json({ success: false, message: "Manga already in library" });
    }

    user.library.push({ manga: mangaId });
    await user.save();
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/api/library/rate", async (req, res) => {
  const { userId, mangaId, rating, comment } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const mangaIndex = user.library.findIndex(
      (item) => item.manga.toString() === mangaId
    );
    if (mangaIndex === -1)
      return res
        .status(404)
        .json({ success: false, message: "Manga not in library" });

    user.library[mangaIndex].rating = rating;
    user.library[mangaIndex].comment = comment;
    await user.save();

    res.json({ success: true, updatedLibrary: user.library });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/api/library/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).populate(
      {
        path: "library.manga", // Populate manga field
        select: "_id title author cover_art", // Select necessary fields
      }
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, library: user.library });
  } catch (error) {
    console.error("Error fetching user library:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
