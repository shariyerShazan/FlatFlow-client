import React from "react";
import { Link } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import { PiBuildingApartmentBold } from "react-icons/pi";

function ErrorPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-4">
        <PiBuildingApartmentBold className="text-3xl text-favone" />
        <h1 className="text-3xl font-bold text-gray-800">
          Flat<span className="text-favone">Flow</span>
        </h1>
      </div>

      {/* Error message */}
      <h2 className="text-5xl font-bold text-gray-800 mb-4">404</h2>
      <p className="text-lg text-gray-600 mb-6">
        Oops! The page you’re looking for doesn’t exist.
      </p>

      <Link
        to="/"
        className="flex items-center gap-2 bg-favone text-white px-4 py-2 rounded hover:bg-favone/90 transition"
      >
        <FaArrowLeft />
        Go back Home
      </Link>
    </div>
  );
}

export default ErrorPage;
