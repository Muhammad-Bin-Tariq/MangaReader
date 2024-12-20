import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Navbar from "../components/Navbar.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import overlayImage from "../assets/dragon-ball-appsmsvihvalq341.jpg";

function WelcomePage() {
  const navigate = useNavigate(); // Initialize useNavigate

  const onClickHandler = () => {
    navigate("/Homepage"); // Navigate to the Homepage route
  };

  return (
    <>
      <Navbar />
      <div className="relative h-[calc(100vh-4rem)] flex justify-center items-center">
        {/* Background Image */}
        <img
          src={overlayImage}
          alt="BackgroundImage"
          className="absolute w-full h-full object-center"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-Black bg-opacity-60 flex justify-center items-center">
          <button
            className="text-4l font-semibold text-White bg-DeepBlue px-3 py-2 rounded hover:bg-BrightBlue"
            onClick={onClickHandler} // Add onClick event
          >
            GO TO HOMEPAGE <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </>
  );
}

export default WelcomePage;
