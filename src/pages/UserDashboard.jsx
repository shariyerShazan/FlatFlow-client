


import React from "react";

import { useSelector } from "react-redux";
import AllAnnouncements from "./pageForAdmin/AllAnnouncements";


const UserDashboard = () => {
  const { user } = useSelector((store) => store.user); // user info from redux




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
      <h2 className="text-center  text-xl font-bold text-favone ">All Announcement here</h2>
      <AllAnnouncements />
    </div>
  );
};

export default UserDashboard;
