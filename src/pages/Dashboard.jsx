import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Dashboard = () => {
  const { user } = useContext(UserContext); // Access user context
  const { username } = useParams(); // Get username from URL
  const [userLibrary, setUserLibrary] = useState([]);
  const navigate = useNavigate(); // Navigation hook

  useEffect(() => {
    // Fetch user's library data
    const fetchUserLibrary = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3010/api/library/${user.username}`
        );
        setUserLibrary(response.data.library);
      } catch (error) {
        console.error("Error fetching library:", error);
      }
    };

    fetchUserLibrary();
  }, [user.username]);
  const coverArtApi = (id, coverArt) => {
    return `https://uploads.mangadex.org/covers/${id}/${coverArt}`;
  };

  return (
    <div className="dashboard bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">{user.username}'s Library</h1>
        <div className="flex flex-wrap -mx-4">
          {userLibrary.map(({ manga }) => (
            <div key={manga._id} className="w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-8">
              <div
                className="manga-card bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/manga/${manga.id}`)}
              >
                <img
                  src={coverArtApi(manga.id, manga.coverArt)}
                  alt={manga.title}
                  className="object-cover w-full h-64"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white truncate">
                    {manga.title}
                  </h3>
                  <p className="text-sm text-gray-400">{manga.author}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {userLibrary.length === 0 && (
          <p className="text-center text-gray-400">
            No mangas in your library yet.
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
