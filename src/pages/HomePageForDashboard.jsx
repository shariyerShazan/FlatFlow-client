import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaTimesCircle } from "react-icons/fa";
import { PiBuildingApartmentBold, PiUsersThreeFill } from "react-icons/pi";
import { MdRememberMe } from "react-icons/md";
import { useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../utlis/apiEndPoints";

const HomePageForDashboard = () => {
  useEffect(() => {
      document.title = "Dashboard | FlatFlow";
    }, []);
  const { user } = useSelector((store) => store.user); // user info from redux

  const [dashboardData, setDashboardData] = useState({
    totalUser: 0,
    totalMember: 0,
    totalApartment: 0,
    availableApartment: 0,
    agreementedApartment: 0,
    PercentageOfAvailable: 0,
    PercentageOfAgreemented: 0,
  });

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const fetchDashboardData = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/datas`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setDashboardData(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      }
    };

    fetchDashboardData();
  }, []);

  const {
    totalUser,
    totalMember,
    totalApartment,
    availableApartment,
    agreementedApartment,
    PercentageOfAvailable,
    PercentageOfAgreemented,
  } = dashboardData;

  const cards = [
    {
      title: "Total Apartment",
      count: totalApartment,
      color: "bg-green-50",
    },
    {
      title: "Available Apartment",
      count: availableApartment,
      color: "bg-blue-50",
    },
    {
      title: "Agreemented Apartment",
      count: agreementedApartment,
      color: "bg-amber-50",
    },
    {
      title: "Total Users",
      count: totalUser,
      color: "bg-yellow-50",
    },
    {
      title: "Total Members",
      count: totalMember,
      color: "bg-purple-50",
    },
    {
      title: "Available %",
      count: `${PercentageOfAvailable}%`,
      color: "bg-green-100",
    },
    {
      title: "Agreemented %",
      count: `${PercentageOfAgreemented}%`,
      color: "bg-red-100",
    },
  ];

  const getIconByTitle = (title) => {
    switch (title) {
      case "Total Apartment":
        return <PiBuildingApartmentBold size={28} className="text-green-600" />;
      case "Available Apartment":
        return <PiBuildingApartmentBold size={28} className="text-blue-600" />;
      case "Agreemented Apartment":
        return <FaTimesCircle size={28} className="text-amber-600" />;
      case "Total Users":
        return <PiUsersThreeFill size={28} className="text-yellow-600" />;
      case "Total Members":
        return <MdRememberMe size={28} className="text-purple-600" />;
      case "Available %":
        return <PiBuildingApartmentBold size={28} className="text-green-700" />;
      case "Agreemented %":
        return <FaTimesCircle size={28} className="text-red-700" />;
      default:
        return <PiBuildingApartmentBold size={28} className="text-gray-500" />;
    }
  };

  return (
    <div className="p-6">
      {/* Profile Card */}
      <div className="max-w-xl mx-auto mb-12 bg-white shadow-lg rounded-xl p-6 flex items-center gap-6 border border-gray-200">
        <img
          src={user?.profilePicture}
          alt="profile"
          className="w-20 h-20 rounded-full object-cover border-4 border-myPrimary"
        />
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{user?.fullName}</h3>
          <p className="text-gray-600">{user?.email}</p>
          <p className="text-gray-600">Role: {user?.role}</p>
        </div>
      </div>

      {/* Dashboard Section */}
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
              <div className="bg-white p-2 rounded-full shadow animate-bounce">
                {getIconByTitle(card.title)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePageForDashboard;
