import React from 'react';

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-[60vh]">
      <div className="text-center">
        <div className="loader mx-auto mb-4 w-12 h-12 border-4 border-dashed border-[#9381ff] rounded-full animate-spin"></div>
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
