import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 border-4 border-primary-fuchsia border-t-transparent border-solid rounded-full animate-spin"></div>
      <p className="mt-4 text-xl font-semibold text-text-dark">Buscando los mejores regalos...</p>
      <p className="text-gray-500">Un momento, por favor.</p>
    </div>
  );
};

export default LoadingSpinner;