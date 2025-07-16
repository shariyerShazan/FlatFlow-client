import React, { useState, useEffect } from "react";
import axios from "axios";
import { CUPONS_API_END_POINT } from "../../utlis/apiEndPoints";
import { toast } from "react-toastify";

const MakeCupons = () => {
    useEffect(() => {
          document.title = "Coupon | FlatFlow";
        }, []);
  const [coupons, setCoupons] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ code: "", discountPercentage: "", expiresAt: "" });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "code" ? value.toUpperCase() : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    const { code, discountPercentage, expiresAt } = form;

    if (!code || !discountPercentage || !expiresAt) {
      setError("All fields are required");
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
        { withCredentials: true }
      );

      if (res.data.success) {
        setSuccessMsg("Coupon created successfully!");
        toast(res.data.message)
        setForm({ code: "", discountPercentage: "", expiresAt: "" });
        fetchCoupons();
        setModalOpen(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error creating coupon");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 bg-white border-2 border-favone rounded shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-favone">Manage Coupons</h2>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-favone text-white px-4 py-2 rounded hover:bg-favone/80"
        >
          + Add Coupon
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {coupons.length === 0 ? (
          <p className="text-center text-gray-500 italic">No coupons found.</p>
        ) : (
          <table className="min-w-full border border-gray-300 text-center">
            <thead className="bg-favone text-white">
              <tr>
                <th className="py-2 px-4 border">Coupon Code</th>
                <th className="py-2 px-4 border">Discount (%)</th>
                <th className="py-2 px-4 border">Expires At</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon) => (
                <tr key={coupon._id} className="bg-gray-50 hover:bg-gray-100">
                  <td className="py-2 px-4 border font-semibold">{coupon.code}</td>
                  <td className="py-2 px-4 border">{coupon.discountPercentage}%</td>
                  <td className="py-2 px-4 border">
                    {new Date(coupon.expiresAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-[90%] max-w-md p-6 shadow-lg relative border-2 border-favone">
            <h3 className="text-xl font-bold text-favone mb-4">Add New Coupon</h3>

            {error && <p className="text-red-600 mb-2">{error}</p>}
            {successMsg && <p className="text-green-600 mb-2">{successMsg}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Coupon Code</label>
                <input
                  type="text"
                  name="code"
                  value={form.code}
                  onChange={handleChange}
                  maxLength={10}
                  className="w-full border border-gray-400 px-4 py-2 rounded"
                  placeholder="E.g. RENT50"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Discount Percentage</label>
                <input
                  type="number"
                  name="discountPercentage"
                  value={form.discountPercentage}
                  onChange={handleChange}
                  min={1}
                  max={100}
                  className="w-full border border-gray-400 px-4 py-2 rounded"
                  placeholder="E.g. 10"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">description</label>
                <textarea
                  type="text"
                  name="discountPercentage"
                   required
                  className="w-full border border-gray-400 px-4 py-2 rounded"
                  placeholder="description"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Expiry Date</label>
                <input
                  type="date"
                  name="expiresAt"
                  value={form.expiresAt}
                  onChange={handleChange}
                  className="w-full border border-gray-400 px-4 py-2 rounded"
                />
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                    setForm({ code: "", discountPercentage: "", expiresAt: "" });
                    setError("");
                  }}
                  className="px-4 py-2 rounded border border-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded bg-favone text-white hover:bg-favone/80 disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MakeCupons;
