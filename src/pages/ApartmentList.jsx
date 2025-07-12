import React from "react";
import { useSelector } from "react-redux";
import useGetApartmentList from "../hooks/useGetApartmentList";
import { PiBuildingApartmentBold } from "react-icons/pi";
import { Link } from "react-router";

const ApartmentList = () => {
    // const {user}= useSelector((store)=>store.user)
  useGetApartmentList();
  const {
    apartments,
    //  currentPage, totalPages, totalAppartments
  } = useSelector((store) => store.apartment);

  return (
    <div className="px-6 py-10">
      <h2 className="text-2xl flex justify-center items-center gap-3  font-bold mb-6 text-center text-favone">
        <span className="text-black animate-bounce">
          <PiBuildingApartmentBold />
        </span>{" "}
        Available Apartments
      </h2>

      {/* Apartment Cards */}
      <div className="flex flex-wrap gap-4 justify-center">
        {apartments && apartments.length > 0 ? (
          apartments.map((apartment) => (
            <Link to={`${apartment._id}`}
              key={apartment._id}
              className="border-2 border-favone rounded-xl shadow-md p-2 w-72 hover:shadow-2xl group relative"
            >
              <img
                src={apartment?.image}
                alt={`Apartment ${apartment?.apartmentNo}`}
                className="w-full h-52 object-cover rounded-md mb-4 group-hover:opacity-40"
              />
              <div className="hidden group-hover:block absolute top-1/3 right-1/5 text-lg font-extrabold">
                <p>
                    Click to view details
                </p>
              </div>
             
             
              <p>
                <span className="font-bold">Rent: $</span>
                {apartment?.rent}
              </p>
              <p
                className={`font-bold ${
                  apartment?.available ? "text-green-600" : "text-red-500"
                }`}
              ><span className="font-bold text-black">Status: </span>
                {apartment?.available ? "Available" : "Not Available"}
              </p>
              <div className="flex justify-center ">
                
                <h1 className="text-2xl font-bold my-2 group-hover:-translate-y-[470%] duration-500">Flat<span className="text-[#9381ff]">Flow</span></h1>
            
          </div>
             
            </Link>
          ))
        ) : (
          <p className="text-center col-span-3">No apartments found.</p>
        )}
      </div>
    </div>
  );
};

export default ApartmentList;





