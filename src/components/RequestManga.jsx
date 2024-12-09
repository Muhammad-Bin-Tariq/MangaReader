import React, { useState } from "react";
import emailjs from "emailjs-com"; // Import EmailJS for email sending

const RequestManga = ({ onClose }) => {
  const [mangaName, setMangaName] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send email using EmailJS API
    const templateParams = {
      manga_name: mangaName,
      additional_details: additionalDetails,
    };

    emailjs
      .send(
        "service_n0ecjpa", // Service ID from EmailJS
        "template_83e2al2", // Template ID from EmailJS
        templateParams,
        "GpmmOCxt3kR73qm3D" // User ID from EmailJS
      )
      .then(
        (response) => {
          console.log("Email sent successfully!", response);
        },
        (error) => {
          console.error("Failed to send email", error);
        }
      );

    // Close the modal after submission
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold text-center mb-4 text-gray-800">
          Request a Manga
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="mangaName"
              className="block text-sm font-medium text-gray-700"
            >
              Manga Name
            </label>
            <input
              type="text"
              id="mangaName"
              name="mangaName"
              value={mangaName}
              onChange={(e) => setMangaName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
              placeholder="Enter manga name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="additionalDetails"
              className="block text-sm font-medium text-gray-700"
            >
              Additional Details (Optional)
            </label>
            <textarea
              id="additionalDetails"
              name="additionalDetails"
              value={additionalDetails}
              onChange={(e) => setAdditionalDetails(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
              placeholder="Enter any other details (if manga name is not remembered)"
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 py-2 px-4 rounded-full text-gray-800"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestManga;
