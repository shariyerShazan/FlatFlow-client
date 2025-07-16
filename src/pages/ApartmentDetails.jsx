import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";
import { AGREEMENT_API_END_POINT, APARTMENT_API_END_POINT } from "../utlis/apiEndPoints";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import useGetUserAgreements from "../hooks/useGetUserAgreements";
import AgreementModal from "../components/AgreementModal";
// import EditApartmentModal from "../components/EditApartmentModal";
import Swal from "sweetalert2";
import EditApartmentModal from "../components/EditApartmentModal";


const ApartmentDetails = () => {
  useEffect(() => {
      document.title = "Apartment details | FlatFlow";
    }, []);
  const { id } = useParams();
  const { user } = useSelector((store) => store.user);
  const [apartment, setApartment] = useState(null);
  const [isOpen , setIsOpen] = useState(false)
  const [triggerAgreementFetch, setTriggerAgreementFetch] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);



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

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });
  
    if (result.isConfirmed) {
      try {
        const res = await axios.delete(`${APARTMENT_API_END_POINT}/apartments/${id}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          toast.success(res.data.message);
          window.location.href = "/"; // redirect or refresh
        }
      } catch (error) {
        console.log(error)
        toast.error("Failed to delete apartment");
      }
    }
  };
  

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
  <span className={apartment?.available ? "text-green-600 font-semibold" : " text-red-600 font-semibold"}>
    {apartment?.available ? "Available" : "Rented"}
  </span>
</p>
      <p className="text-gray-700 mt-4">{apartment?.description}</p>

      <div className="mt-6 flex gap-4 flex-wrap">
      {((user?.role === "member" || user?.role === "user") && !apartment.available && (
  alreadyApply) ? (
    <button
      onClick={handleCancelAgreement}
      className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer"
    >
      Cancel Request
    </button>
  ):( user?.role === "admin" )? (
    <div className="flex gap-4 mt-6">
      <button
        onClick={() => setOpenEditModal(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Edit
      </button>
      <button
        onClick={handleDelete}
        className="bg-red-600 text-white px-4 py-2 rounded-md"
      >
        Delete
      </button>
    </div>
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

{openEditModal && (
  <EditApartmentModal
    apartment={apartment}
    onClose={() => setOpenEditModal(false)}
    onUpdated={() => window.location.reload()}
  />
)}


    
    </div>
  );
};

export default ApartmentDetails;
