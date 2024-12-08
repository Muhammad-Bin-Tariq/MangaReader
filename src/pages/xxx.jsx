import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import MangaTile from "../components/MangaTile.jsx";
import TopRatedMangas from "../data/TopRatedManga.js";
import superSaiyan from "../assets/gokuGif.gif";
import superSaiyanStatic from "../assets/gokuGif.png";
import { Manga } from "mangadex-full-api"; // Import MangaDex API

function Homepage() {
  const [chapters, setChapters] = useState([]); // State to hold chapters
  const [pages, setPages] = useState([]); // State to hold pages for a selected chapter
  const [loading, setLoading] = useState(false); // Loading state

  const fetchChapters = async (mangaId) => {
    try {
      setLoading(true);
      // Fetch Manga by ID
      const manga = await Manga.get(mangaId);
      // Fetch chapters
      const chapterList = await manga.getFeed({
        translatedLanguage: ["en"], // Fetch only English chapters
        limit: Infinity, // Fetch up to 100 chapters (adjust as needed)
      });
      setChapters(chapterList);
      setPages([]); // Clear any previously loaded chapter pages
    } catch (error) {
      console.error("Error fetching chapters:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchChapterPages = async (chapterId) => {
    try {
      setLoading(true);
      // Fetch the selected chapter
      const selectedChapter = chapters.find((chap) => chap.id === chapterId);
      if (!selectedChapter) throw new Error("Chapter not found!");
      // Fetch pages for the selected chapter
      const chapterPages = await selectedChapter.getReadablePages();
      setPages(chapterPages);
    } catch (error) {
      console.error("Error fetching chapter pages:", error);
    } finally {
      setLoading(false);
    }
  };

  const popularMangaToDisplay = TopRatedMangas.map((manga) => {
    const { id, description, rating } = manga;
    return (
      <MangaTile
        key={id}
        {...manga}
        description={description.bayesian || description} // Fallback if needed
        rating={rating.bayesian || rating} // Fallback if needed
      />
    );
  });

  return (
    <>
      <Navbar />
      <div className="bg-LightOrange">
        <h1 className="text-2xl font-bold text-DeepBlue px-6 pt-4">
          Top Rated Mangas
        </h1>
        <div className="flex items-center px-6">
          <p className="text-lg italic text-DeepBlue">
            Go Super Saiyan after these reads!
          </p>
          <div className="group relative w-20 h-20">
            <img
              src={superSaiyan}
              alt="Super Saiyan Animated"
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100"
            />
            <img
              src={superSaiyanStatic}
              alt="Super Saiyan Static"
              className="absolute inset-0 w-1/2 h-1/2 object-cover group-hover:opacity-0 m-auto"
            />
          </div>
        </div>

        {/* Input and Button to Fetch Chapters */}
        <div className="px-6 py-4">
          <label
            htmlFor="mangaId"
            className="block text-sm font-medium text-DeepBlue"
          >
            Enter Manga ID to Fetch Chapters:
          </label>
          <input
            type="text"
            id="mangaId"
            className="border rounded px-3 py-2 w-full"
            placeholder="e.g., 12345..."
            onKeyDown={(e) => {
              if (e.key === "Enter") fetchChapters(e.target.value);
            }}
          />
        </div>

        {/* Loading Indicator */}
        {loading && (
          <p className="text-center text-lg text-DeepBlue">Loading...</p>
        )}

        {/* Chapters List */}
        <div className="px-6 py-4">
          <h2 className="text-xl font-semibold text-DeepBlue">Chapters:</h2>
          {chapters.map((chapter, index) => {
            const chapterNumber = parseFloat(chapter.attributes?.chapter); // Convert chapter to a number
            return (
              <button
                key={chapter.id}
                onClick={() => fetchChapterPages(chapter.id)}
                className="block text-left w-full px-4 py-2 bg-DeepBlue text-white my-2 rounded hover:bg-LightOrange"
              >
                Chapter{" "}
                {Number.isNaN(chapterNumber) ? index + 1 : chapterNumber}:{" "}
                {chapter.attributes?.title || "Untitled"}
              </button>
            );
          })}
        </div>

        {/* Chapter Pages */}
        {pages.length > 0 && (
          <div className="px-6 py-4">
            <h2 className="text-xl font-semibold text-DeepBlue">
              Reading Chapter:
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {pages.map((page, index) => (
                <img
                  key={index}
                  src={page}
                  alt={`Page ${index + 1}`}
                  className="w-full rounded border"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Homepage;
