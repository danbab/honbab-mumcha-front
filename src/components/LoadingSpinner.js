import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-green-500 flex justify-center items-center">Loading</div>
    </div>
  );
};

export default LoadingSpinner;