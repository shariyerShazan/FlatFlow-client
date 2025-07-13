// PaymentModal.jsx
import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { ImCross } from "react-icons/im";

// Stripe Public Key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentModal = ({ apartment, onClose }) => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [coupon, setCoupon] = useState("");
  const [finalAmount, setFinalAmount] = useState(null);
  const [discountPercent, setDiscountPercent] = useState(0);

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 bg-black/30">
      <div className="w-[95%] max-w-md bg-white p-6 rounded-lg shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-favone font-bold text-xl cursor-pointer"
        >
          <ImCross />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-4 text-favone">
          Rent Payment
        </h2>

        {/* Apartment Info */}
        <div className="space-y-2 text-gray-700 text-sm">
          <p><strong>Member Email:</strong> {apartment?.memberEmail}</p>
          <p><strong>Block:</strong> {apartment?.block}</p>
          <p><strong>Floor:</strong> {apartment?.floor}</p>
          <p><strong>Apartment No:</strong> {apartment?.apartmentNo}</p>
          <p><strong>Rent:</strong> ${apartment?.rent}</p>
        </div>

        {/* Month Select */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Month
          </label>
          <select
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">-- Select Month --</option>
            {[
              "January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December",
            ].map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>

        {/* Coupon Apply */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Apply Coupon
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value.toUpperCase())}
              className="flex-1 border border-gray-300 rounded px-3 py-2"
            />
            <button
              className="bg-favone text-white px-4 py-2 rounded hover:bg-favtwo"
              onClick={(e) => {
                e.preventDefault();
                // No action needed here because discount applied on payment intent fetch
                alert("Coupon will be applied after month selection.");
              }}
            >
              Apply
            </button>
          </div>
        </div>

        {/* Show Payable Amount */}
        <div className="mt-4 font-semibold text-lg text-center">
          Payable Amount:{" "}
          <span className="text-favone">
            ${finalAmount && finalAmount}
          </span>
          {discountPercent > 0 && (
            <span className="text-green-600 ml-2">({discountPercent}% discount applied)</span>
          )}
        </div>

        {/* Stripe Checkout Form */}
        <div className="mt-6">
          {selectedMonth ? (
            <Elements stripe={stripePromise}>
              <CheckoutForm
              finalAmount={finalAmount}
                onClose={onClose}
                apartment={apartment}
                selectedMonth={selectedMonth}
                coupon={coupon}
                setFinalAmount={setFinalAmount}
                setDiscountPercent={setDiscountPercent}
              />
            </Elements>
          ) : (
            <p className="text-center mt-4 text-gray-500">Please select a month to proceed.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;



