import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useGetUserAgreements from '../../hooks/useGetUserAgreements'
import axios from 'axios';
import { AGREEMENT_API_END_POINT } from '../../utlis/apiEndPoints';
import { toast } from 'react-toastify';


const MyBooking = () => {
useEffect(() => {
      document.title = "Booked | FlatFlow";
    }, []);

  const [triggerAgreementFetch, setTriggerAgreementFetch] = useState(false);
  useGetUserAgreements(triggerAgreementFetch)
  const handleCancelAgreement = async (id)=>{
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

  const { userAgreemented } = useSelector((store) => store.agreement)

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 min-h-[70vh]">
      <h2 className="text-2xl font-bold mb-6 text-center">My Bookings</h2>

      {userAgreemented.length > 0 ? (
        <div className="space-y-4 flex flex-col ">
          {userAgreemented.map((booking) => (
            <div
              key={booking._id}
              className=" rounded-md rounded-r-2xl hover:shadow-2xl border-r-18 border-favone shadow-md flex flex-col sm:flex-row gap-6  items-center justify-center bg-white"
            >
              {/* Apartment Image */}
              <img
                src={booking.apartmentFor?.image || "https://via.placeholder.com/150"}
                alt="apartment"
                className="w-96 h-max object-cover rounded"
              />

              {/* Details */}
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-1">
                  Apartment No: {booking.apartmentFor?.apartmentNo}
                </h3>
                <p>Block: {booking.apartmentFor?.block}</p>
                <p>Floor: {booking.apartmentFor?.floor}</p>
                <p>Rent: ${booking.apartmentFor?.rent}</p>
                <p>Contact: {booking.contactNo}</p>

                <p className="mt-2">
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      booking.status === "accepted"
                        ? "text-green-600"
                        : booking.status === "rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1)}
                  </span>
                </p>
                <button
        onClick={()=>handleCancelAgreement(booking.apartmentFor._id)}
        className="bg-red-500 text-white my-2 px-4 py-2 rounded-md cursor-pointer"
      >
        Cancel Request
      </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 italic">You haven’t booked any apartment yet.</p>
      )}
    </div>
  )
}

export default MyBooking
