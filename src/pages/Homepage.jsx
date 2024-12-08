import React, { useEffect, useState } from "react";
import MangaTile from "../components/MangaTile";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import superSaiyan from "../assets/gokuGif.gif";
import superSaiyanStatic from "../assets/gokuGif.png";

function Homepage() {
  const [topRatedMangas, setTopRatedMangas] = useState([]);
  const [genresMangas, setGenresMangas] = useState({});
  const [loading, setLoading] = useState(true);

  const genres = [
    "Action",
    "Adventure",
    "Drama",
    "Psychological",
    "Romance",
    "Sci-Fi",
    "Slice of Life",
    "Thriller",
  ];

  // Fetch Top Rated Mangas
  const fetchTopRatedMangas = async () => {
    try {
      const response = await fetch("http://localhost:3010/api/mangas");
      const data = await response.json();
      const topRated = data.sort((a, b) => b.rating - a.rating).slice(0, 10);
      setTopRatedMangas(topRated);
    } catch (error) {
      console.error("Error fetching top-rated mangas:", error);
    }
  };

  // Fetch Mangas by Genre
  const fetchMangasByGenre = async () => {
    try {
      const response = await fetch("http://localhost:3010/api/mangas");
      const data = await response.json();

      const mangasByGenre = genres.reduce((acc, genre) => {
        acc[genre] = data.filter((manga) => manga.genre?.includes(genre));
        return acc;
      }, {});

      setGenresMangas(mangasByGenre);
    } catch (error) {
      console.error("Error fetching mangas by genre:", error);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      await Promise.all([fetchTopRatedMangas(), fetchMangasByGenre()]);
      setLoading(false);
    };

    fetchAllData();
  }, []);

  const displayMangasSection = (title, mangas) => (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-white px-6 pt-4">{title}</h2>
      <div className="overflow-hidden py-4 px-6">
        <div
          className="flex space-x-4 overflow-x-auto scrollbar-hide"
          style={{ scrollBehavior: "smooth" }}
        >
          {mangas.map((manga) => (
            <MangaTile key={manga._id} {...manga} />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white min-h-screen">
      <Navbar />
      <div className="py-10">
        <div className="flex items-center px-6 mb-8">
          <p className="text-lg italic text-white">
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
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-lg font-bold animate-pulse">Loading...</p>
          </div>
        ) : (
          <>
            {displayMangasSection("Top Rated Mangas", topRatedMangas)}

            {genres.map((genre) =>
              genresMangas[genre]?.length > 0
                ? displayMangasSection(`${genre} Mangas`, genresMangas[genre])
                : null
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Homepage;
