const mongoose = require("mongoose");

const MangaSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  author: String,
  coverArt: String,
  genre: String,
  rating: Number,
  contentRating: String,
});

const Manga = mongoose.model("Manga", MangaSchema);

module.exports = Manga;
