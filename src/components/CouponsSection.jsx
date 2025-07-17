import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { CUPONS_API_END_POINT } from "../utlis/apiEndPoints";


const CouponsSection = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await axios.get(CUPONS_API_END_POINT, { withCredentials: true });
        if (res.data.success) {
          setCoupons(res.data.coupons);
        }
      } catch (error) {
        console.error("Failed to fetch coupons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  return (
    <section className="bg-gradient-to-r from-purple-100 via-pink-100 to-red-100 py-16 px-6 md:px-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-5xl mx-auto text-center mb-12"
      >
        <h2 className="text-4xl font-extrabold text-purple-700 mb-4 tracking-tight">
          Available <span className="text-pink-600">Coupons</span>
        </h2>
        <p className="text-lg text-purple-800">
          Grab the best deals and save big! Here are the coupons you can use right now.
        </p>
      </motion.div>

      {loading ? (
        <div className="text-center text-purple-600 font-semibold">Loading coupons...</div>
      ) : coupons.length === 0 ? (
        <div className="text-center text-red-500 font-semibold">No coupons available right now.</div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          { coupons.map((coupon, index) => (
            <motion.div
              key={coupon._id || index}
              className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-2xl hover:scale-105 transition-transform duration-300 border-2 border-purple-300"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.08, boxShadow: "0 15px 25px rgba(219, 39, 119, 0.3)" }}
            >
              <h3 className="text-2xl font-bold text-purple-700 mb-2">{coupon?.title || "Coupon Title"}</h3>
              <p className="text-sm text-gray-800 font-bold mb-4">Discount: {coupon?.discountPercentage  || "0"}%</p>
              <p className={`text-sm  font-bold mb-4 ${coupon?.available? "text-green-500" : "text-red-500"  }`}>{coupon?.available? "Available" : "Notavailable"  }</p>
              <div className="text-xl font-mono text-pink-600 tracking-widest bg-pink-100 inline-block px-3 py-1 rounded-lg select-none">
                {coupon?.code || "NO-CODE"}
              </div>
              <p className="mt-4 text-sm text-gray-500"><span className="font-bold">Expires on: </span>{coupon?.expiresAt.slice(0,10)}</p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default CouponsSection;
