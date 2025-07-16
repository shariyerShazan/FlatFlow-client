import React from 'react';
import { useSelector } from 'react-redux';

const DashboardPageForMember = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div>
      <div className="max-w-xl mx-auto mb-12 my-8 bg-white shadow-lg rounded-xl p-6 flex items-center gap-6 border border-gray-200">
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
    <div
      className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-lg flex items-center justify-center text-center text-white px-6"
      style={{
        backgroundImage: `url('https://www.shutterstock.com/image-vector/flat-vector-design-statistical-data-600nw-1766397167.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.6)_100%)] z-0"></div>

      {/* Content */}
      <div className="relative z-10 text-black">
        <h1 className="text-4xl font-bold mb-3 drop-shadow-md">
           Welcome, {user?.fullName?.split(' ')[0]}!
        </h1>
        <p className="text-lg font-medium drop-shadow-sm">
          We're glad to have you here on your member dashboard.
        </p>
      </div>
    </div>
    </div>
  );
};

export default DashboardPageForMember;
