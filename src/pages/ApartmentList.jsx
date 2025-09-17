import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useGetApartmentList from "../hooks/useGetApartmentList";
import { PiBuildingApartmentBold } from "react-icons/pi";
import { Link } from "react-router";
import { setCurrentPage, setLimit } from "../redux/apartment.slice";
import AOS from "aos";
import "aos/dist/aos.css";

const ApartmentList = () => {


  useEffect(() => {
        AOS.init({ duration: 1000 });
      document.title = "Apartments | FlatFlow";
    }, []);
  const dispatch = useDispatch();
  const { apartments, currentPage, totalPages, limit } = useSelector((store) => store.apartment);

  const [rentMin, setRentMin] = useState("");
  const [rentMax, setRentMax] = useState("");
  const [filterTrigger, setFilterTrigger] = useState(0); 

  useGetApartmentList({ rentMin, rentMax, dependency: filterTrigger });

  const handleSearch = () => {
    dispatch(setCurrentPage(1));
    setFilterTrigger((prev) => prev + 1); 
  };

  return (
    <div className="px-6 py-10 min-h-[70vh]">
      <h2 className="text-3xl flex justify-center items-center gap-3 font-bold mb-6 text-center text-favone">
        <span className="text-black animate-bounce">
          <PiBuildingApartmentBold />
        </span>
        Available Apartments
      </h2>

      {/* Search Filter */}
      <div className="flex justify-center gap-4 items-center mb-8 flex-wrap">
        <input
          type="number"
          placeholder="Min Rent"
          className="  w-42 px-4 py-2 border-2 border-favone rounded-md "
          value={rentMin}
          onChange={(e) => setRentMin(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Rent"
          className=" w-42 px-4 py-2 border-2 border-favone rounded-md"
          value={rentMax}
          onChange={(e) => setRentMax(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="btn bg-favone/90 text-white hover:bg-favone"
        >
          Search
        </button>
      </div>

      {/* Apartment Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {apartments && apartments.length > 0 ? (
          apartments.map((apartment , idx) => (
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
    <button className="mt-5 cursor-pointer w-full py-2 rounded-xl bg-favone text-white font-semibold hover:bg-favone/90 transition">
      View Apartment
    </button>
  </div>
</Link>

          ))
        ) : (
          <p className="text-center col-span-3">No apartments found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="join my-6 flex justify-center gap-2 flex-wrap">
        <button
          disabled={currentPage <= 1}
          onClick={() => dispatch(setCurrentPage(currentPage - 1))}
          className="join-item btn bg-favone/60 hover:bg-favone/70"
        >
          «
        </button>
        <button className="join-item btn bg-favone/60">
          Page {currentPage}
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => dispatch(setCurrentPage(currentPage + 1))}
          className="join-item btn bg-favone/60 hover:bg-favone/70"
        >
          »
        </button>
        <button className="join-item px-4 py-2 border-favone border rounded-md">
          Total: {totalPages}
        </button>

        <select
          value={limit}
          onChange={(e) => {
            dispatch(setLimit(Number(e.target.value)));
            dispatch(setCurrentPage(1));
          }}
          className="border border-favone rounded-md px-3"
        >
          <option value={6}>Limit: 6</option>
          <option value={10}>Limit: 10</option>
          <option value={20}>Limit: 20</option>
        </select>
      </div>
    </div>
  );
};

export default ApartmentList;
