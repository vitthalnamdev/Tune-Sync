import React, { useState } from "react";

function Submit_button(params) {

  return (
    <div className="submit-container">
      <button
        type="submit"
        disabled={params.isSubmitting}
        className="w-full flex justify-center py-3 px-4 border-0 rounded-xl shadow-lg shadow-blue-700/30 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 focus:outline-none disabled:opacity-50 transition-all duration-300"
        onClick={params.handleSubmit}
      >
        {params.isRedirecting ? ( // Use isRedirecting from state instead of params
          <div>Redirecting...</div>
        ) : (
          "Join Network"
        )}
      </button>
    </div>
  );
}

export default Submit_button;
