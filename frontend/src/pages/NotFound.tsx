import React from "react";
import { useNavigate } from "react-router-dom";

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-24 space-y-8">
      <div className="text-center">
        <p className="text-8xl font-extrabold text-slate-800 select-none">404</p>
        <h1 className="text-2xl font-bold text-white mt-4">Page Not Found</h1>
        <p className="text-slate-400 mt-2 max-w-md">
          This endpoint doesn't exist in the system. The route you're looking for may have been
          moved or never existed.
        </p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-lg transition-all duration-200 cursor-pointer"
        >
          ← Return to Home
        </button>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-medium rounded-lg transition-all duration-200 cursor-pointer"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};