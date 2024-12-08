import React, { useState } from "react";
import { Link } from "react-router-dom";

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
  const [showWarning, setShowWarning] = useState(false); // Track warning modal visibility

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
    contentRating === "erotica" || contentRating === "pornographic";

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
