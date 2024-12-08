const axios = require("axios");
const mongoose = require("mongoose");

const baseUrl = "https://api.mangadex.org";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/Manga");

const mangaSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  author: String,
  coverArt: String,
  genre: String,
  rating: Number,
  contentRating: String,
});

const Manga = mongoose.model("Manga", mangaSchema);

// Function to fetch author details by ID
const fetchAuthorById = async (authorId) => {
  try {
    const authorResponse = await axios.get(`${baseUrl}/author/${authorId}`);
    return authorResponse.data.data.attributes.name;
  } catch {
    return null;
  }
};

// Function to fetch cover art details by ID
const fetchCoverArtById = async (coverArtId) => {
  try {
    const coverArtResponse = await axios.get(`${baseUrl}/cover/${coverArtId}`);
    return coverArtResponse.data.data.attributes.fileName;
  } catch {
    return null;
  }
};

// Function to extract the first genre from tags
const extractGenre = (tags) => {
  const genreTag = tags.find((tag) => tag.attributes.group === "genre");
  return genreTag ? genreTag.attributes.name.en : null;
};

// Function to fetch rating details by manga ID
const fetchRatingById = async (mangaId) => {
  try {
    const ratingResponse = await axios.get(
      `${baseUrl}/statistics/manga/${mangaId}`
    );
    return ratingResponse.data.statistics[mangaId]?.rating?.average || null;
  } catch {
    return null;
  }
};

// Function to fetch mangas in batches
const fetchMangas = async (offset, limit) => {
  try {
    const response = await axios.get(`${baseUrl}/manga`, {
      params: {
        offset,
        limit,
        "order[rating]": "desc", // Order by rating
        hasAvailableChapters: true, // Only mangas with available chapters
      },
      timeout: 10000,
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching mangas:", error.message);
    return [];
  }
};

// Function to fetch and process mangas
const fetchAndProcessMangas = async (totalMangas) => {
  const batchSize = 100; // Fetch in batches of 100
  let offset = 0;
  const validMangas = [];

  while (offset < totalMangas) {
    const mangas = await fetchMangas(offset, batchSize);

    for (const manga of mangas) {
      const { id, attributes, relationships } = manga;
      const { title, description, tags, contentRating } = attributes;

      // Fetch additional data
      const authorRel = relationships.find((rel) => rel.type === "author");
      const coverArtRel = relationships.find((rel) => rel.type === "cover_art");

      const author = authorRel ? await fetchAuthorById(authorRel.id) : null;
      const coverArt = coverArtRel
        ? await fetchCoverArtById(coverArtRel.id)
        : null;
      const genre = extractGenre(tags);
      const rating = await fetchRatingById(id);

      // Skip if any required attribute is null
      if (
        !title?.en ||
        !description?.en ||
        !author ||
        !coverArt ||
        !genre ||
        !rating
      ) {
        console.log(`Skipping manga ID: ${id} due to missing data.`);
        continue;
      }

      // Add valid manga to the list
      validMangas.push({
        id,
        title: title.en,
        description: description.en,
        author,
        coverArt,
        genre,
        rating,
        contentRating,
      });
    }

    offset += batchSize;
    console.log(`Processed ${offset} mangas so far...`);
    await delay(200); // Add delay to prevent rate-limiting
  }

  return validMangas;
};

// Save valid mangas to MongoDB
const saveMangasToDB = async (mangas) => {
  try {
    await Manga.insertMany(mangas);
    console.log("Successfully saved mangas to MongoDB.");
  } catch (error) {
    console.error("Error saving mangas to MongoDB:", error);
  }
};

// Main function
const main = async () => {
  try {
    const totalMangas = 400; // Fetch top 400 mangas
    const mangas = await fetchAndProcessMangas(totalMangas);
    console.log(`Total valid mangas fetched: ${mangas.length}`);
    await saveMangasToDB(mangas);
    mongoose.connection.close();
  } catch (error) {
    console.error("Error during execution:", error.message);
    mongoose.connection.close();
  }
};

main();
