import React from "react";
import raditzImage from "../assets/raditz.png"; // Placeholder image
// import gokuImage from "../assets/gokuGif.png"; // Placeholder for Goku
// import piccoloImage from "../assets/gokuGif.png"; // Placeholder for Piccolo
// import trunksImage from "../assets/gokuGif.png"; // Placeholder for Trunks

const Footer = () => {
  return (
    <footer className="bg-DeepBlue text-white py-6">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <a
            href="https://api.mangadex.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mb-4"
          >
            {/* Raditz Image */}
            <div className="flex items-center justify-center">
              <h2 className="text-2xl font-bold text-White">
                Powered by Over 300 Mangas!
              </h2>
            </div>
          </a>
          <p className="mb-4">
            Data provided by{""}
            <a
              href="https://api.mangadex.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-yellow-300"
            >
              <img
                src="https://api.mangadex.org/favicon.ico"
                alt="MangaDex Logo"
                className="w-6 h-6 inline-block ml-2"
              />
            </a>
          </p>
          <p className="text-lg font-semibold">Z Fighters who created this:</p>
          <ul className="list-none p-0 flex flex-wrap justify-center gap-2 mt-2">
            {/* Goku */}
            <li className="bg-yellow-500 px-3 py-1 rounded-full text-sm flex items-center">
              Muhammad Bin Tariq (NU ID: i22-8761)
            </li>
            {/* Piccolo */}
            <li className="bg-green-600 px-3 py-1 rounded-full text-sm flex items-center">
              Umer Abdullah (NU ID: i22-1349)
            </li>
            {/* Trunks */}
            <li className="bg-purple-600 px-3 py-1 rounded-full text-sm flex items-center">
              Muhammad Zunair (NU ID: i22-2729)
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
