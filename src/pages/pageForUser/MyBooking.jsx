import React from 'react'
import { useSelector } from 'react-redux'
import useGetUserAgreements from '../../hooks/useGetUserAgreements'


const MyBooking = () => {

  useGetUserAgreements()

  const { userAgreemented } = useSelector((store) => store.agreement)

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
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
