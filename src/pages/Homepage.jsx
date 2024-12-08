import React from "react";
import Navbar from "../components/Navbar.jsx";
import MangaTile from "../components/MangaTile.jsx";
import TopRatedMangas from "../data/TopRatedManga.js";
import superSaiyan from "../assets/gokuGif.gif";
import superSaiyanStatic from "../assets/gokuGif.png";

function Homepage() {
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
          <p className="text-lg italic text-DeepBlue ">
            Go Super Saiyan after these reads!
          </p>
          <div className="group relative w-20 h-20 ">
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
        {popularMangaToDisplay}
      </div>
    </>
  );
}

export default Homepage;
