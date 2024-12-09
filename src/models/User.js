const mongoose = require("mongoose");
const Manga = require("./Manga");

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  library: [
    {
      manga: { type: mongoose.Schema.Types.ObjectId, ref: "Manga" },
      rating: { type: Number },
      comment: { type: String },
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
