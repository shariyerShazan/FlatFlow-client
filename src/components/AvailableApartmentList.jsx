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
    <div className="px-6 py-10 min-h-[70vh]">
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
                data-aos-delay={idx * 200}
                className="border border-favone rounded-xl shadow-md p-4 hover:shadow-xl group transition bg-white relative"
              >
                <img
                  src={apartment?.image || "https://via.placeholder.com/400"}
                  alt={`Apartment ${apartment?.apartmentNo}`}
                  className="w-full h-52 object-cover rounded-md mb-4 group-hover:opacity-40 transition"
                />
                <div className="hidden group-hover:flex absolute inset-0 justify-center items-center text-lg font-bold ">
                  Click to view details
                </div>
                <div className="space-y-1">
                  <p>
                    <span className="font-bold">Block:</span> {apartment.block}
                  </p>
                  <p>
                    <span className="font-bold">Floor:</span> {apartment.floor}
                  </p>
                  <p>
                    <span className="font-bold">Apartment No:</span>{" "}
                    {apartment.apartmentNo}
                  </p>
                  <p>
                    <span className="font-bold">Rent:</span> ${apartment.rent}
                  </p>
                  <p className="font-bold text-green-600">Status: Available</p>
                  <span className="group-hover:hidden text-sm">
                    click to details...
                  </span>
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
