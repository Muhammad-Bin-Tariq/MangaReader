import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Manga } from "mangadex-full-api"; // Import MangaDex API

function MangaOverview() {
  const { id } = useParams(); // Extract manga ID from the URL
  const [manga, setManga] = useState(null);
  const [chapters, setChapters] = useState([]); // Store fetched chapters
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // To handle errors

  // Fetch manga details by ID
  const fetchMangaById = async () => {
    try {
      const response = await fetch(`http://localhost:3010/api/mangas/${id}`);
      if (!response.ok) {
        throw new Error("Manga not found");
      }
      const data = await response.json();
      setManga(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch chapters using MangaDex API
  const fetchChapters = async () => {
    try {
      const manga = await Manga.get(id); // Fetch manga by ID
      const chapterList = await manga.getFeed({
        translatedLanguage: ["en"], // English chapters
        limit: Infinity, // Fetch all chapters
      });

      // Sort chapters by chapter number in ascending order
      const sortedChapters = chapterList.sort((a, b) => {
        const chapterA = parseFloat(a.chapter) || 0; // Handle non-numeric chapters
        const chapterB = parseFloat(b.chapter) || 0;
        return chapterA - chapterB;
      });

      setChapters(sortedChapters);
    } catch (error) {
      console.error("Error fetching chapters:", error);
    }
  };

  // Load manga and chapters
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchMangaById();
      await fetchChapters();
      setLoading(false);
    };
    loadData();
  }, [id]);

  // Construct cover art URL dynamically
  const coverArtApi = (coverArt) => {
    return `https://uploads.mangadex.org/covers/${id}/${coverArt}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 to-black text-white">
        <p className="text-lg font-bold animate-pulse">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100 text-red-600">
        <p className="text-lg font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white min-h-screen">
      <Navbar />

      <div className="manga-overview py-10">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-White drop-shadow-md">
          {manga.title}
        </h1>
        <div className="container mx-auto px-4">
          {manga && (
            <div className="flex flex-col md:flex-row items-center bg-gray-800 rounded-xl shadow-lg p-6">
              {/* Manga Image on the left */}
              <div className="w-full md:w-1/3 mb-6 md:mb-0 flex justify-center">
                <img
                  src={coverArtApi(manga.coverArt)}
                  alt={`${manga.title} cover`}
                  className="w-[80%] max-h-[500px] object-cover rounded-lg shadow-xl transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Manga Details on the right */}
              <div className="w-full md:w-2/3 md:pl-8">
                <div className="space-y-4">
                  <div>
                    <p className="text-lg font-semibold text-White">
                      Description:
                    </p>
                    <p className="text-base leading-relaxed text-gray-300">
                      {manga.description}
                    </p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-White">Author:</p>
                    <p className="text-base text-gray-300">{manga.author}</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-White">Genres:</p>
                    <p className="text-base text-gray-300">{manga.genre}</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-White">Rating:</p>
                    <p className="text-base text-gray-300">{manga.rating}</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-White">
                      Content Rating:
                    </p>
                    <p className="text-base text-gray-300">
                      {manga.contentRating}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Chapter List */}
        <div className="container mx-auto px-4 mt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Chapters</h2>
          <div className="flex overflow-x-auto space-x-4 p-4 bg-gray-700 rounded-lg shadow-lg scrollbar-hide">
            {chapters.map((chapter) => (
              <div
                key={chapter.id}
                className="flex-shrink-0 w-40 bg-gray-800 rounded-lg shadow-md p-4"
              >
                <p className="text-sm font-semibold text-white mb-2">
                  {`Chapter ${chapter.chapter || "?"}`}{" "}
                  {/* Display chapter number */}
                </p>
                <p className="text-xs text-gray-300">{chapter.title}</p>
                <p className="text-xs text-gray-300">Vol. {chapter.volume}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MangaOverview;
