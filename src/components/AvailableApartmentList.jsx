import React, { useEffect, useState } from "react";
import { PiBuildingApartmentBold } from "react-icons/pi";
import { Link } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { APARTMENT_API_END_POINT } from "../utlis/apiEndPoints";

const AvailableApartmentList = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
    document.title = "Available Apartments | FlatFlow";
  }, []);

  const [availableApartment, setAvailableApartment] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAvailableApartments = async () => {
      try {
        const res = await axios.get(`${APARTMENT_API_END_POINT}/available`, {
          withCredentials: true,
        });

        if (res.data.success) {
            // console.log(res.data.apartment)
          setAvailableApartment(res.data.apartments.slice(0,8));
        }
      } catch (err) {
        console.error("Failed to fetch available apartments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableApartments();
  }, []);

  return (
    <div className="px-6 py-10 min-h-[70vh] bg-gradient-to-r from-purple-100 via-pink-100 to-red-100">
      <h2 className="text-3xl flex justify-center items-center gap-3 font-bold mb-6 text-center text-favone">
        <span className="text-black animate-bounce">
          <PiBuildingApartmentBold />
        </span>
        Available Apartments
      </h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading available apartments...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {availableApartment && availableApartment.length > 0 ? (
            availableApartment.map((apartment, idx) => (
      <Link
  to={`/apartments/${apartment._id}`}
  key={apartment._id}
  data-aos="fade-up"
  data-aos-delay={idx * 150}
  className="bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition duration-300 flex flex-col overflow-hidden"
>
  {/* Image */}
  <img
    src={apartment?.image || "https://via.placeholder.com/400"}
    alt={`Apartment ${apartment?.apartmentNo}`}
    className="w-full h-52 object-cover"
  />

  {/* Content */}
  <div className="p-5 flex-1 flex flex-col justify-between">
    <div className="space-y-2">
      <h3 className="text-xl font-bold text-gray-900">
        Apartment {apartment.apartmentNo}
      </h3>
      <p className="text-gray-700">
        <span className="font-semibold">Block:</span> {apartment.block}
      </p>
      <p className="text-gray-700">
        <span className="font-semibold">Floor:</span> {apartment.floor}
      </p>
      <p className="text-gray-700">
        <span className="font-semibold">Rent:</span>{" "}
        <span className="text-favone font-bold">${apartment.rent}</span>
      </p>
      <p className="font-semibold text-green-600">Available ✅</p>
    </div>

    {/* Button */}
    <button className="mt-5 w-full py-2 cursor-pointer rounded-xl bg-favone text-white font-semibold hover:bg-favone/90 transition">
      View Apartment
    </button>
  </div>
</Link>



            ))
          ) : (
            <p className="text-center col-span-3">
              No available apartments found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AvailableApartmentList;
