import React from "react";
import { useNavigate } from "react-router-dom";

const Header = (params) => {
  const navigate = useNavigate();
  const userData = params.profileData;
  
  // Get first letter of firstName if userData exists
  const firstInitial = userData?.firstName ? userData.firstName.charAt(0).toUpperCase() : '';
  
  return (
    <>
      {/* Header */}
      <header className="sticky top-0 bg-gray-900/90 backdrop-blur-md z-50 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="#" className="text-2xl font-bold">
              TuneSync<span className="text-purple-500">.</span>
            </a>

            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                <li>
                  <a href="#" className="text-white font-medium">
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors font-medium"
                  >
                    Connect
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors font-medium"
                  >
                    Library
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors font-medium"
                  >
                    Artists
                  </a>
                </li>
              </ul>
            </nav>

            <div className="flex space-x-4">
              {userData ? (
                // Profile icon with first initial when user is logged in - now larger
                <div 
                  className="w-12 h-12  rounded-full bg-purple-600 flex items-center justify-center text-white text-xl font-bold cursor-pointer hover:bg-purple-700 transition-colors"
                  onClick={() => navigate("/profile" , {state : {data: userData}})}
                  title={userData.firstName}
                >
                  {firstInitial}
                </div>
              ) : (
                // Login and Signup buttons when no user is logged in
                <>
                  <button
                    className="px-4 py-2 rounded-full border border-gray-600 text-white font-medium hover:border-white transition-colors"
                    onClick={() => navigate("/Login")}
                  >
                    Log In
                  </button>
                  <button 
                    className="px-4 py-2 rounded-full bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors"
                    onClick={() => navigate("/Signup")}
                  >
                    Sign Up   
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;