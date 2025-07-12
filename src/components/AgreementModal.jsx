import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { AGREEMENT_API_END_POINT } from "../utlis/apiEndPoints";
// import useGetUserAgreements from "../hooks/useGetUserAgreements";


const AgreementModal = ({ onClose, apartmentId , setTriggerAgreementFetch }) => {


  const { user } = useSelector((store) => store.user);



  const handleAgreement = async (e) => {
    e.preventDefault();

    const contactNo = e.target.contactNo.value;

    if (!contactNo) {
      toast.error("Please provide your contact number");
      return;
    }

    try {
      const res = await axios.post(
        `${AGREEMENT_API_END_POINT}/create-agreement/${apartmentId}`,
        { contactNo },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        onClose(); 
        setTriggerAgreementFetch((prev)=> !prev)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Agreement failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-96 p-6 rounded-md shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl cursor-pointer hover:text-black"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4 text-favone">Confirm Booking</h2>

        <form onSubmit={handleAgreement} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              name="email"
              defaultValue={user?.email}
              disabled
              className="w-full border px-4 py-2 rounded-md bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Contact Number</label>
            <input
              type="number"
              name="contactNo"
              placeholder="e.g. 017xxxxxxxx"
              className="w-full border px-4 py-2 rounded-md"
              required
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-favone hover:bg-favone/30 rounded-md cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-favone text-white rounded-md hover:bg-favone/90 cursor-pointer"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgreementModal;
