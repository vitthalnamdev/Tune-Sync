import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import sendEmail from "../../services/operations/send_Mail";

function Submit_button(params) {
  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleSubmit = async () => {
    // Set redirecting state to true
    setIsRedirecting(true);

    // Send email with OTP and store the returned OTP
    console.log(params.formData.email);
    const otp = await sendEmail(params.formData.email); // Ensure you await the OTP

    const data = {
      formData: params.formData,
      otp: otp, // Include the OTP in the data being passed
    };

    // Navigate to verification page with both form data and OTP
    navigate("/verification-email", { state: { data } });
  };

  return (
    <div className="submit-container">
      <button
        type="submit"
        disabled={params.isSubmitting}
        className="w-full flex justify-center py-3 px-4 border-0 rounded-xl shadow-lg shadow-blue-700/30 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 focus:outline-none disabled:opacity-50 transition-all duration-300"
        onClick={handleSubmit}
      >
        {isRedirecting ? ( // Use isRedirecting from state instead of params
          <div>Redirecting...</div>
        ) : (
          "Join Network"
        )}
      </button>
    </div>
  );
}

export default Submit_button;
