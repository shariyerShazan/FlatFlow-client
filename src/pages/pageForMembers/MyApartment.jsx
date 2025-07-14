import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import useGetUserAgreements from '../../hooks/useGetUserAgreements'
import PaymentModal from '../../components/PaymentModal'

const MyApartment = () => {
  useGetUserAgreements()

  const { userAgreemented } = useSelector((store) => store.agreement)

  const [selectedBooking, setSelectedBooking] = useState(null)

  const acceptedAgreements = userAgreemented.filter(
    (agreement) => agreement.status === "accepted"
  )

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">My Bookings</h2>

      {acceptedAgreements.length > 0 ? (
        <div className="space-y-4 flex flex-col">
          {acceptedAgreements.map((booking) => (
            <div
              key={booking._id}
              className="rounded-md rounded-r-2xl hover:shadow-2xl border-r-8 border-favone shadow-md flex flex-col sm:flex-row gap-6 items-center justify-center bg-white p-4"
            >
              {/* Apartment Image */}
              <img
                src={booking.apartmentFor?.image || "https://via.placeholder.com/150"}
                alt="apartment"
                className="w-72 h-44 object-cover rounded-md"
              />

              {/* Details */}
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-1">
                  Apartment No: {booking.apartmentFor?.apartmentNo}
                </h3>
                <p>Block: {booking.apartmentFor?.block}</p>
                <p>Floor: {booking.apartmentFor?.floor}</p>
                <p>Rent: ${booking.apartmentFor?.rent}</p>
                {/* <p>Contact: {booking.contactNo}</p> */}

                <p className="my-1">
                  Status:{" "}
                  <span className="font-semibold text-green-600">
                    {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1)}
                  </span>
                </p>
                <button
                  onClick={() => setSelectedBooking(booking)}
                  className='btn bg-favone hover:bg-favone/80'
                >
                  Let's pay rent
                </button>
              </div>
            </div>
          ))}

          {/* Modal Rendering */}
          {selectedBooking && (
            <PaymentModal
              apartment={selectedBooking.apartmentFor}
              agreementId={selectedBooking._id}
              onClose={() => setSelectedBooking(null)}
            />
          )}
        </div>
      ) : (
        <p className="text-center text-gray-500 italic">
          You haven’t booked any apartment yet.
        </p>
      )}
    </div>
  )
}

export default MyApartment
