import React from "react";

export const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full w-full m-auto">
      <div className="animate-spin rounded-full border-t-4 border-gray-300 w-12 h-12 border-indigo-600" />
    </div>
  );
};
