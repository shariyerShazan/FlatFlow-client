import React, { useState, useEffect } from "react";
import axios from "axios";
import { CUPONS_API_END_POINT } from "../../utlis/apiEndPoints";

const MakeCupons = () => {
  const [code, setCode] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const res = await axios.get(`${CUPONS_API_END_POINT}`, { withCredentials: true });
      if (res.data.success) {
        setCoupons(res.data.coupons);
      }
    } catch (err) {
      console.error("Error fetching coupons:", err);
      setError("Failed to load coupons.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    if (!code || !discountPercentage || !expiresAt) {
      setError("Something is missing");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${CUPONS_API_END_POINT}/create`,
        {
          code,
          discountPercentage: Number(discountPercentage),
          expiresAt,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setSuccessMsg("Coupon created successfully!");
        setCode("");
        setDiscountPercentage("");
        setExpiresAt("");
        fetchCoupons();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error creating coupon");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 border-2 border-favone rounded-md shadow mt-10 bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Coupon</h2>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left side: Image */}
        <div className="md:w-1/3 flex justify-center items-center">
          <img
            src="https://downloadpsd.cc/wp-content/uploads/2020/07/Free-Discount-Coupons-Template-PSD.jpg"
            alt="Coupon"
            className="rounded shadow-lg"
          />
        </div>

        {/* Right side: Form */}
        <div className="md:w-2/3">
          {error && <p className="text-red-600 mb-3">{error}</p>}
          {successMsg && <p className="text-green-600 mb-3">{successMsg}</p>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-semibold mb-1">Coupon Code</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="w-full  px-4 py-2 rounded-md border-2 border-gray-700"
                placeholder="Example: RENT50"
                maxLength={10}
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Discount Percentage</label>
              <input
                type="number"
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(e.target.value)}
                className="w-full border px-4 py-2 rounded-md border-2 border-gray-700 "
                placeholder="Example: 50"
                min={1}
                max={100}
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Expiry Date</label>
              <input
                type="date"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                className="w-full border px-4 py-2 rounded-md border-2 border-gray-700 "
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-favone text-white py-2 rounded hover:bg-favone/80 transition disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Creating..." : "Create Coupon"}
            </button>
          </form>
        </div>
      </div>

      {/* Coupons List below */}
      <div className="mt-10">
        <h3 className="text-xl font-bold mb-5 text-center text-favone">All Coupons</h3>

        {coupons.length === 0 ? (
          <p className="text-center text-gray-500 italic">No coupons found.</p>
        ) : (
          <ul className="max-h-72 overflow-y-auto space-y-4 px-4">
            {coupons.map((coupon) => (
              <li
                key={coupon._id}
                className="border rounded-2 border-gray-400 p-4 flex justify-between items-center bg-gray-50 shadow-sm"
              >
                <div>
                  <p className="font-semibold text-lg">{coupon.code}</p>
                  <p className="text-sm text-gray-700">
                  <span className="font-bold">Discount: </span>{coupon.discountPercentage}%
                  </p>
                  <p className="text-sm text-gray-700">
                   <span className="font-bold">Expires: </span> {new Date(coupon.expiresAt).toLocaleDateString()}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MakeCupons;
