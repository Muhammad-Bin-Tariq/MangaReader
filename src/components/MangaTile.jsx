import React from "react";

const MangaTile = ({
  id,
  title,
  artist,
  author,
  description,
  rating,
  views,
  mainCover,
}) => {
  // Helper function to truncate the description to 50 words
  const truncateDescription = (text) => {
    // Check if the input is valid
    if (typeof text !== "string" || text.trim() === "") {
      return "";
    }

    const words = text.split(" ");
    return words.length > 50 ? words.slice(0, 50).join(" ") + "..." : text;
  };

  return (
    <div className="flex flex-wrap flex--manga">
      <div className="w-full md:w-full lg:w-1/2 max-w-4xl rounded overflow-hidden shadow-lg m-4 flex justify-between bg-blue-400">
        <div className="md:flex-shrink-0">
          <img className="md:w-56" src={mainCover} alt={`${title} cover`} />
        </div>
        <div className="flex flex-col flex-grow px-8 py-4 bg-color-333">
          <h3 className="font-bold text-4xl md:text-2xl lg:text-2xl text-gray-200 manga--title">
            {title}
          </h3>
          <span className="manga--details text-xl lg:text-sm lg:mb-4">
            Author: {author} | Artist: {artist}
          </span>
          <div className="flex-grow">
            <p className="text-xl md:text-base lg:text-base text-gray-100 leading-snug truncate-overflow">
              {truncateDescription(description)}
            </p>
          </div>
          <div className="text-sm text-gray-400 mt-2">
            Rating: {rating} | Views: {views}
          </div>
          <div className="button-container flex justify-between mt-4">
            <button className="text-lg mr-4 lg:text-sm text-gray-200">
              More Info
            </button>
            <button className="text-lg lg:text-sm font-bold py-2 px-4 rounded bg-orange-200 text-orange-700">
              Add to List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MangaTile;
