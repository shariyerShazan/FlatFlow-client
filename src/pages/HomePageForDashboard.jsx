import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaTimesCircle, FaBriefcase, FaClipboardList, FaCheckCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { PiBuildingApartmentBold } from "react-icons/pi";
import { PiUsersThreeFill } from "react-icons/pi";
import { MdRememberMe } from "react-icons/md";

const HomePageForDashboard = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const {totalAppartments } = useSelector((store)=>store.apartment)
  const {totalUser , totalMember } = useSelector((store)=>store.user)

  const cards = [
   
    {
      title: "Total Appartment",
      count: totalAppartments,
      icon: <PiBuildingApartmentBold size={28} className="text-green-600" />,
      color: "bg-green-50",
    },
    {
      title: "Total Users",
      count: totalUser || 0,
      icon: <PiUsersThreeFill size={28} className="text-yellow-600" />,
      color: "bg-yellow-50",
    },
    {
      title: "Total Members",
      count: totalMember || 0,
      icon: <MdRememberMe size={28} className="text-purple-600" />,
      color: "bg-purple-50",
    }, {
        title: "Rejected Jobs",
        count: 25,
        icon: <FaTimesCircle size={28} className="text-red-600" />,
        color: "bg-red-50",
      }
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-8 text-myPrimary text-center">
        📊 Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => (
          <div
            key={idx}
            data-aos="fade-up"
            data-aos-delay={idx * 100}
            className={`rounded-xl shadow p-6 ${card.color} transition hover:shadow-lg`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm text-gray-500 mb-1">{card.title}</h4>
                <p className="text-2xl font-bold">{card.count}</p>
              </div>
              <div className="bg-white p-2 rounded-full shadow animate-bounce">{card.icon}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePageForDashboard;
