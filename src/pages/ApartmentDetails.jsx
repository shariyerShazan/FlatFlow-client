import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";
import { AGREEMENT_API_END_POINT, APARTMENT_API_END_POINT } from "../utlis/apiEndPoints";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import useGetUserAgreements from "../hooks/useGetUserAgreements";
import AgreementModal from "../components/AgreementModal";


const ApartmentDetails = () => {
  const { id } = useParams();
  const { user } = useSelector((store) => store.user);
  const [apartment, setApartment] = useState(null);
  const [isOpen , setIsOpen] = useState(false)
  const [triggerAgreementFetch, setTriggerAgreementFetch] = useState(false);


  useGetUserAgreements(triggerAgreementFetch);

   const {userAgreemented} = useSelector((store) => store.agreement);
   

   const alreadyApply = userAgreemented.some(agreement => {
    return agreement?.apartmentFor?._id === id;
  });
  

  useEffect(() => {
    const fetchApartmentDetails = async () => {
      try {
        const res = await axios.get(
          `${APARTMENT_API_END_POINT}/apartment/${id}`,
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          toast(res.data.message);
          setApartment(res.data.apartment);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchApartmentDetails();
  }, [id , alreadyApply]);
  
  const handleCancelAgreement = async ()=>{
    try {
      const res = await axios.delete(`${AGREEMENT_API_END_POINT}/cancel-agreement/${id}` , {withCredentials: true})
      if (res.data.success) {
        toast(res.data.message);
        setTriggerAgreementFetch((prev) => !prev)
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  if (!apartment) return <Loading />;

  return (
    <div className="max-w-4xl mx-auto p-6 shadow-lg bg-white rounded-xl my-10">
      <img
        src={apartment.image || "https://via.placeholder.com/400"}
        alt="Apartment"
        className="w-full h-64 object-cover rounded-md mb-6"
      />

      <h3 ><span className="font-bold">Block: </span> {apartment?.block}</h3>
      <p>
        <span className="font-bold">Floor: </span>
        {apartment?.floor}
      </p>
      <p>
        <span className="font-bold">Apartment No: </span>
        {apartment?.apartmentNo}
      </p>
      <p ><span className="font-bold">Rent: $</span>{apartment?.rent}</p>
      <p>
        {/* modal */}
        {isOpen && <AgreementModal setTriggerAgreementFetch={setTriggerAgreementFetch} apartmentId={apartment._id} onClose={() => setIsOpen(false)} />}
     {/* modal */}
  <span className="font-bold">Status: </span>
  <span className={apartment?.isRented ? "text-red-600 font-semibold" : "text-green-600 font-semibold"}>
    {apartment?.isRented ? "Rented" : "Available"}
  </span>
</p>
      <p className="text-gray-700 mt-4">{apartment?.description}</p>

      <div className="mt-6 flex gap-4 flex-wrap">
      {(user?.role === "member" || user?.role === "user") && !apartment.isRented && (
  alreadyApply ? (
    <button
      onClick={handleCancelAgreement}
      className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer"
    >
      Cancel Request
    </button>
  ) : (
    <button
      onClick={() => setIsOpen(true)}
      className="bg-purple-600 text-white px-4 py-2 rounded-md cursor-pointer"
    >
      Book Now
    </button>
  )
)}

</div>

    
    </div>
  );
};

export default ApartmentDetails;
