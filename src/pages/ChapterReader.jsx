import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom"; // Use useNavigate for navigation
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Manga } from "mangadex-full-api"; // Import MangaDex API

function ChapterReader() {
  const { chapterId } = useParams(); // Get chapter ID from the URL
  const location = useLocation(); // Use location to retrieve mangaId
  const mangaId = location.state.mangaId; // Get mangaId passed via location state
  const navigate = useNavigate(); // Use navigate for page navigation

  const [pages, setPages] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch chapters based on mangaId
  const fetchChapters = async (mangaId) => {
    try {
      setLoading(true);
      const manga = await Manga.get(mangaId); // Fetch Manga by ID
      const chapterList = await manga.getFeed({
        translatedLanguage: ["en"], // Fetch only English chapters
        limit: Infinity, // Fetch up to 100 chapters
      });
      setChapters(chapterList); // Set the fetched chapters
      setPages([]); // Clear previously loaded chapter pages
    } catch (error) {
      console.error("Error fetching chapters:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch pages for a selected chapter
  const fetchChapterPages = async (chapterId) => {
    try {
      setLoading(true);
      const selectedChapter = chapters.find((chap) => chap.id === chapterId);
      if (!selectedChapter) throw new Error("Chapter not found!");
      const chapterPages = await selectedChapter.getReadablePages();
      setPages(chapterPages); // Set the chapter pages
    } catch (error) {
      console.error("Error fetching chapter pages:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch chapters and pages when the component is mounted
  useEffect(() => {
    fetchChapters(mangaId); // Fetch chapters for the manga
  }, [mangaId]);

  // Fetch pages when the chapterId changes
  useEffect(() => {
    if (chapterId) {
      fetchChapterPages(chapterId); // Fetch pages for the specific chapter
    }
  }, [chapterId, chapters]); // Re-fetch chapter pages when chapterId or chapters change

  // Navigate to the previous chapter
  const handlePreviousChapter = () => {
    const currentChapterIndex = chapters.findIndex(
      (chapter) => chapter.id === chapterId
    );
    if (currentChapterIndex > 0) {
      const previousChapter = chapters[currentChapterIndex - 1];
      navigate(`/chapter/${previousChapter.id}`, {
        state: { mangaId },
      });
    }
  };

  // Navigate to the next chapter
  const handleNextChapter = () => {
    const currentChapterIndex = chapters.findIndex(
      (chapter) => chapter.id === chapterId
    );
    if (currentChapterIndex < chapters.length - 1) {
      const nextChapter = chapters[currentChapterIndex + 1];
      navigate(`/chapter/${nextChapter.id}`, {
        state: { mangaId },
      });
    }
  };

  // Back to Manga Overview
  const handleBackToOverview = () => {
    navigate(`/manga/${mangaId}`, { state: { mangaId } });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-lg animate-pulse">Loading pages...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar />
      <div className="py-10">
        <h1 className="text-3xl font-bold text-center mb-8">
          Chapter {chapterId} Pages
        </h1>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={handlePreviousChapter}
            disabled={
              chapters.findIndex((chapter) => chapter.id === chapterId) === 0
            }
            className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 disabled:bg-gray-500 transition-all duration-200 ease-in-out transform hover:scale-105"
          >
            Previous Chapter
          </button>

          <button
            onClick={handleNextChapter}
            disabled={
              chapters.findIndex((chapter) => chapter.id === chapterId) ===
              chapters.length - 1
            }
            className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 disabled:bg-gray-500 transition-all duration-200 ease-in-out transform hover:scale-105"
          >
            Next Chapter
          </button>
        </div>
        {/* Back to Manga Overview Button */}
        <div className="text-center mt-8">
          <button
            onClick={handleBackToOverview}
            className="bg-BrightOrange text-white px-6 py-3 rounded-xl shadow-md hover:bg-DeepOrange transition-all duration-200 ease-in-out transform hover:scale-105"
          >
            Back to Manga Overview
          </button>
        </div>

        {/* Pages */}
        <div className="container mx-auto px-4 space-y-4 my-4">
          {pages.map((page, index) => (
            <img
              key={index}
              src={page}
              alt={`Page ${index + 1}`}
              className="w-full max-w-screen-lg mx-auto rounded-lg shadow-lg"
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ChapterReader;
