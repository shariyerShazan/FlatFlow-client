import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  AGREEMENT_API_END_POINT,
  APARTMENT_API_END_POINT,
} from "../utlis/apiEndPoints";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import useGetUserAgreements from "../hooks/useGetUserAgreements";
import AgreementModal from "../components/AgreementModal";
import Swal from "sweetalert2";
import EditApartmentModal from "../components/EditApartmentModal";

const ApartmentDetails = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Apartment details | FlatFlow";
  }, []);

  const { id } = useParams();
  const { user } = useSelector((store) => store.user);

  const [apartment, setApartment] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [triggerAgreementFetch, setTriggerAgreementFetch] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  useGetUserAgreements(triggerAgreementFetch);

  const { userAgreemented } = useSelector((store) => store.agreement);

  const alreadyApply = userAgreemented.some(
    (agreement) => agreement?.apartmentFor?._id === id
  );

  const handelUser = () => {
    if (!user) {
      toast("Please login first");
      navigate("/login");
    }
  };

  useEffect(() => {
    const fetchApartmentDetails = async () => {
      try {
        const res = await axios.get(
          `${APARTMENT_API_END_POINT}/apartment/${id}`,
          { withCredentials: true }
        );
        if (res.data.success) {
          setApartment(res.data.apartment);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchApartmentDetails();
  }, [id, alreadyApply]);

  const handleCancelAgreement = async () => {
    try {
      const res = await axios.delete(
        `${AGREEMENT_API_END_POINT}/cancel-agreement/${id}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast(res.data.message);
        setTriggerAgreementFetch((prev) => !prev);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

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
        const res = await axios.delete(
          `${APARTMENT_API_END_POINT}/apartments/${id}`,
          { withCredentials: true }
        );
        if (res.data.success) {
          toast.success(res.data.message);
          window.location.href = "/";
        }
      } catch (error) {
        toast.error("Failed to delete apartment");
        console.log(error)
      }
    }
  };

  if (!apartment) return <Loading />;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-xl my-10">
      {/* Image */}
      <img
        src={apartment.image || "https://via.placeholder.com/400"}
        alt="Apartment"
        className="w-full h-72 object-cover rounded-xl shadow-md mb-6"
      />

      {/* Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
        <p>
          <span className="font-bold">Block:</span> {apartment?.block}
        </p>
        <p>
          <span className="font-bold">Floor:</span> {apartment?.floor}
        </p>
        <p>
          <span className="font-bold">Apartment No:</span>{" "}
          {apartment?.apartmentNo}
        </p>
        <p>
          <span className="font-bold">Rent:</span>{" "}
          <span className="text-favone font-semibold">
            ${apartment?.rent}
          </span>
        </p>
        <p>
          <span className="font-bold">Status:</span>{" "}
          <span
            className={
              apartment?.available
                ? "text-green-600 font-semibold"
                : "text-red-600 font-semibold"
            }
          >
            {apartment?.available ? "Available" : "Rented"}
          </span>
        </p>
      </div>

      {/* Description */}
      <p className="text-gray-600 mt-5 leading-relaxed">
        {apartment?.description}
      </p>

      {/* Actions */}
      <div className="mt-8 flex gap-4 flex-wrap">
        {!user ? (
          <button
            onClick={handelUser}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Book Now
          </button>
        ) : user?.role === "admin" ? (
          <div className="flex gap-4">
            <button
              onClick={() => setOpenEditModal(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        ) : user?.role === "member" || user?.role === "user" ? (
          alreadyApply ? (
            <button
              onClick={handleCancelAgreement}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Cancel Request
            </button>
          ) : (
            <button
              onClick={() => setIsOpen(true)}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              Book Now
            </button>
          )
        ) : null}
      </div>

      {/* Agreement Modal */}
      {isOpen && (
        <AgreementModal
          setTriggerAgreementFetch={setTriggerAgreementFetch}
          apartmentId={apartment._id}
          onClose={() => setIsOpen(false)}
        />
      )}

      {/* Edit Modal */}
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
