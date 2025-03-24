import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProfile } from "../services/operations/auth";

const Header = (params) => {
  const navigate = useNavigate();
  const [currentTab,setCurrentTab] = useState("Home");
  
  const [profileData, setProfileData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        setTimeout(async () => {
          const userData = await fetchProfile();
          console.log("Fetched User:", userData);
          setProfileData(userData);
        }, 1500);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchData();
  }, []);

  const userData = profileData;
  const showId = params.showId === undefined ? true : false;
  // Get first letter of firstName if userData exists
  const firstInitial = userData?.firstName
    ? userData.firstName.charAt(0).toUpperCase()
    : "";
  console.log(showId);
  return (
    <>
      {/* Header */}
      <header className="sticky top-0 bg-gray-900/90 text-white backdrop-blur-md z-50 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="#" className="text-2xl font-bold">
              TuneSync<span className="text-purple-500">.</span>
            </a>

            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                <li>
                  <a onClick={()=>setCurrentTab("Home")}
                  href="/"  className = {`${currentTab == "Home"? "text-white":"text-gray-400"} font-medium hover:text-white transition-colors`}>
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/connect-page"
                    onClick={()=>setCurrentTab("Connect")}
                    className = {`${currentTab == "Connect"? "text-white":"text-gray-400"} font-medium hover:text-white transition-colors`}
                  >
                    Connect
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={()=>setCurrentTab("Library")}
                    className = {`${currentTab == "Library"? "text-white":"text-gray-400"} font-medium hover:text-white transition-colors`}
                  >
                    Library
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={()=>setCurrentTab("Artists")}
                    className = {`${currentTab == "Artists"? "text-white":"text-gray-400"} font-medium hover:text-white transition-colors`}
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
                  onClick={() =>
                    navigate("/profile", { state: { data: userData } })
                  }
                  title={userData.firstName}
                >
                  {firstInitial}
                </div>
              ) : (
                showId && (
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
                )
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
