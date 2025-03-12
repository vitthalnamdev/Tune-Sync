import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import sendEmail from "../services/operations/send_Mail";

const EmailVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.data;
  
  const [otp, setOtp] = useState(data?.otp || "");
  const [stage, setStage] = useState("verifying"); // initial, verifying, verified
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState(data?.formData.email || "");
  const [resendTimer, setResendTimer] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [wrongOtp, setWrongOtp] = useState(false);

  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [resendTimer]);

  const handleSendCode = () => {
    if (!email) return;

    setIsLoading(true);
    const newOtp = sendEmail(email); // Send email with OTP
    setOtp(newOtp);
    // Simulate sending code
    setTimeout(() => {
      setIsLoading(false);
      setStage("verifying");
      setResendTimer(60); // Start 60 second timer
    }, 1500);
  };

  const handleResendCode = () => {
    if (!email || resendTimer > 0) return;

    setIsResending(true);
    const newOtp = sendEmail(email); // Resend email with OTP
    setOtp(newOtp);
    // Simulate sending code
    setTimeout(() => {
      setIsResending(false);
      setResendTimer(60); // Reset timer to 60 seconds
    }, 1500);
  };

  const handleVerify = () => {
    if (verificationCode.length < 6) return;
    
    setIsLoading(true);
    // Simulate verification process
    setTimeout(() => {
      setIsLoading(false);
      if (verificationCode !== otp) {
        setWrongOtp(true);
      } else {
        setStage("verified");
      }
    }, 1500);
  };

  const handleJoinNetwork = () => {
    // Navigate to choose username page
    navigate("/choose-username", { 
      state: { 
        data: {
          ...data,
          verified: true
        } 
      } 
    });
    // In a real app, you would also send the data to MongoDB here
  };

  // Verification success screen
  if (stage === "verified") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-green-500 p-3">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-white mb-2">
            Email Verified
          </h1>
          <p className="text-gray-300 text-center mb-6">
            Your email has been successfully verified. You can now join our network.
          </p>
          <button
            className="w-full py-3 font-medium rounded-md transition-colors duration-200 bg-indigo-600 hover:bg-indigo-700 text-white"
            onClick={handleJoinNetwork}
          >
            Join Network
          </button>
        </div>
      </div>
    );
  }

  // Initial screen to send verification code
  if (stage === "initial") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full">
          <h1 className="text-2xl font-bold text-center text-white mb-2">
            Verify Your Email
          </h1>
          <p className="text-gray-300 text-center mb-6">
            Click the button below to send a verification code to {email}
          </p>
          
          <button
            className={`w-full py-3 font-medium rounded-md transition-colors duration-200 ${
              isLoading
                ? "bg-indigo-500 cursor-not-allowed opacity-70"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
            onClick={handleSendCode}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending Code...
              </span>
            ) : (
              "Send Verification Code"
            )}
          </button>
        </div>
      </div>
    );
  }

  // Verification code input screen (verifying state)
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-white mb-2">
          Verify Your Email
        </h1>
        <p className="text-gray-300 text-center mb-6">
          Please enter the 6-digit code sent to {email}
        </p>

        <div className="mb-6">
          <input
            type="text"
            maxLength={6}
            className="w-full h-12 text-center text-xl font-bold bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="000000"
            value={verificationCode}
            onChange={(e) =>
              setVerificationCode(e.target.value.replace(/[^0-9]/g, ""))
            }
          />
        </div>
        {wrongOtp && <p className="text-red-500 text-center mb-4">Wrong OTP. Please try again.</p>}
        <button
          className={`w-full py-3 font-medium rounded-md transition-colors duration-200 ${
            isLoading || verificationCode.length < 6
              ? "bg-indigo-500 cursor-not-allowed opacity-70"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
          onClick={handleVerify}
          disabled={isLoading || verificationCode.length < 6}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Verifying...
            </span>
          ) : (
            "Verify Email"
          )}
        </button>

        {/* Resend Code Button with Timer */}
        <div className="mt-4 text-center">
          <button
            className={`text-sm font-medium transition-colors duration-200 ${
              resendTimer > 0 || isResending
                ? "text-gray-500 cursor-not-allowed"
                : "text-indigo-400 hover:text-indigo-300"
            }`}
            onClick={handleResendCode}
            disabled={resendTimer > 0 || isResending}
          >
            {isResending ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-3 w-3 text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Resending...
              </span>
            ) : resendTimer > 0 ? (
              `Resend code in ${resendTimer}s`
            ) : (
              "Resend code"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;