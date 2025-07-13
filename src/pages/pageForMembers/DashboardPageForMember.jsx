import React from 'react';
import { useSelector } from 'react-redux';

const DashboardPageForMember = () => {
  const { user } = useSelector((state) => state.user);

  return (
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
  );
};

export default DashboardPageForMember;
