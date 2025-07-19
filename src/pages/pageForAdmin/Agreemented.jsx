import React, { useState } from 'react'
import useGetAllAgreement from '../../hooks/useGetAllAgreement'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { AGREEMENT_API_END_POINT } from '../../utlis/apiEndPoints'
import { toast } from 'react-toastify'

const Agreemented = () => {
  const [dependency , setDependency]= useState(false)
  useGetAllAgreement(dependency)

  const { allAgreements } = useSelector((store) => store.agreement)




  const handleStatusUpdate = async (id, action) => {
    try {
      const res = await axios.post(
        `${AGREEMENT_API_END_POINT}/handle-agreement/${id}?`,
        {action},
        { withCredentials: true }
      )

      if (res.data.success) {
        toast.success(res.data.message)
        setDependency((prev)=> !prev)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status")
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      {allAgreements?.length > 0 ? (
        allAgreements.map((agreement) => (
          <div
            key={agreement._id}
            className="flex flex-col md:flex-row justify-between items-start gap-6 p-4 border rounded-md shadow-md bg-white"
          >
            {/* Left: Apartment Info */}
            <div className="w-full md:w-1/2 flex items-start gap-4">
              <img
                src={agreement.apartmentFor?.image || "https://via.placeholder.com/150"}
                alt="apartment"
                className="w-32 h-32 object-cover rounded-md"
              />
              <div>
                <h2 className="text-lg font-bold mb-1">Block: {agreement.apartmentFor?.block}</h2>
                <p>Floor: {agreement.apartmentFor?.floor}</p>
                <p>Apartment No: {agreement.apartmentFor?.apartmentNo}</p>
                <p>Rent: ${agreement.apartmentFor?.rent}</p>
              </div>
            </div>

            {/* Right: Requested By Info */}
            <div className="w-full md:w-1/2 space-y-2">
              <p>
                <span className="font-semibold">Requested By: </span>
               <p className='ml-8'>Name: {agreement.requestedBy?.fullName || "N/A"}</p>
               <p className='ml-8'>Email: {agreement.requestedBy?.email || "N/A"}</p>
              </p>
              <p>
                <span className="font-semibold">Contact No: </span>
                {agreement.contactNo || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Agreemented At: </span>
                {agreement.createdAt.slice(0,10) || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Status: </span>
                <span className={`font-medium ${
                  agreement.status === "accepted"
                    ? "text-green-600"
                    : agreement.status === "rejected"
                    ? "text-red-600"
                    : "text-blue-600"
                }`}>
                  {agreement?.status || "Pending"}
                </span>
              </p>

              {/* Accept / Reject Buttons */}
              {agreement?.status === "pending" && (
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => handleStatusUpdate(agreement._id, "accepted")}
                    className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(agreement._id, "rejected")}
                    className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-400 italic">No agreements found.</p>
      )}
    </div>
  )
}

export default Agreemented
