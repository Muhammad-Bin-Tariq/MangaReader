import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { UserContext } from "../context/UserContext"; // Import UserContext
import axios from "axios";

const MangaTile = ({
  id,
  title,
  description,
  author,
  coverArt,
  genre,
  rating,
  contentRating,
}) => {
  const { user, setUser } = useContext(UserContext); // Access user context
  const [isOpen, setIsOpen] = useState(false);
  const [showWarning, setShowWarning] = useState(false); // Track warning modal visibility
  const [isAdded, setIsAdded] = useState(false); // Track if the manga is added to the library
  const navigate = useNavigate(); // To navigate to the user dashboard

  // URL construction for the cover image
  const coverArtApi = () => {
    return `https://uploads.mangadex.org/covers/${id}/${coverArt}`;
  };

  // Function to truncate the title to 4 words and add ellipsis
  const truncateTitle = (title) => {
    const words = title.split(" ");
    if (words.length > 4) {
      return words.slice(0, 4).join(" ") + "...";
    }
    return title;
  };

  // Check if the content rating requires a blur
  const isBlurred =
    (contentRating === "erotica" || contentRating === "pornographic") && !user; // Only blur if user is not logged in

  // Handle click on a blurred manga
  const handleBlurredClick = (e) => {
    if (isBlurred) {
      e.preventDefault(); // Prevent navigation
      setShowWarning(true); // Show the warning modal
    }
  };

  // Close warning modal
  const closeWarning = () => {
    setShowWarning(false);
  };

  // Add manga to the user's library
  const handleAddToLibrary = async () => {
    const hardcodedUserId = "675607fde6762531a6f83a13"; // Hardcoded user ID
    const hardcodedMangaId = "67542b34500e50534dde2700"; // Hardcoded manga ID

    if (!user) {
      alert("You must be logged in to add this manga to your library.");
      return;
    }

    try {
      // Use hardcoded user ID and manga ID
      const response = await axios.post(
        "http://localhost:3010/api/library/add", // Backend API endpoint
        {
          userId: hardcodedUserId, // Hardcoded user ID
          mangaId: hardcodedMangaId, // Hardcoded manga ID
        }
      );

      if (response.data.success) {
        setIsAdded(true); // Mark as added in the UI
        alert("Manga added to your library!");
      } else {
        alert(response.data.message || "Failed to add manga to library.");
      }
    } catch (error) {
      console.error("Error adding manga to library:", error);
      alert("Error adding manga to library.");
    }
  };

  return (
    <div className="manga-tile relative">
      <div className="relative flex flex-col items-center m-4 bg-DeepBlue text-white rounded-lg shadow-xl w-56 h-80 overflow-hidden group">
        {/* Manga Cover Image */}
        <Link
          to={`/manga/${id}`}
          onClick={handleBlurredClick}
          className="block"
        >
          <div className="flex justify-center items-center w-full h-full relative">
            <img
              src={coverArtApi()}
              alt={`${title} cover`}
              className={`object-cover w-full h-full rounded-lg transition-all duration-300 hover:cursor-pointer hover:scale-105 ${
                isBlurred ? "blur-sm pointer-events-none" : ""
              }`}
            />
            {/* Overlay with "Sign In Required" */}
            {isBlurred && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <p className="text-lg font-extrabold text-white">
                  Sign In Required
                </p>
              </div>
            )}
          </div>
        </Link>

        {/* Title (shown on hover) */}
        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
          <h3 className="text-lg font-bold text-center text-white">
            {truncateTitle(title)}
          </h3>
        </div>

        {/* Rating (Optional) */}
        {rating && (
          <div className="absolute top-2 right-2 bg-DeepOrange text-white text-xs rounded-full px-2 py-1">
            {rating}
          </div>
        )}

        {/* Add to Library Button */}
        {user && !isAdded && (
          <button
            onClick={handleAddToLibrary}
            className="absolute top-2 left-2 px-2 py-2 bg-DeepOrange text-white rounded hover:bg-opacity-90"
          >
            Add to Library
          </button>
        )}
        {isAdded && (
          <span className="absolute bottom-2 left-2 px-4 py-2 bg-green-500 text-white rounded">
            Added to Library
          </span>
        )}
      </div>

      {/* Warning Modal */}
      {showWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white text-black rounded-lg shadow-lg p-6 w-80 text-center">
            <h2 className="text-xl font-bold mb-4">Sign In Required</h2>
            <p className="text-base mb-4">
              You must sign in to view content with this rating.
            </p>
            <button
              onClick={closeWarning}
              className="px-4 py-2 bg-DeepBlue text-white font-semibold rounded hover:bg-opacity-90"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MangaTile;
