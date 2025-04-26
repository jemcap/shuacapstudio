import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <h1 className="mt-4 text-xl font-semibold text-gray-700">Loading...</h1>
    </div>
  );
};

export default Loading;
