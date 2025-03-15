// frontend/src/App.js
import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import LoginForm from "./pages/Login";
import VerifyEmail from "./pages/verify_Email";
import Set_username from "./pages/Set_username";
import { Routes, Route } from "react-router-dom";
import { fetchProfile } from "./services/operations/auth";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      try {
        setTimeout(async () => {
          const userData = await fetchProfile();
          console.log("Fetched User:", userData);
          setUser(userData);
          setLoading(false);
        }, 1500); 
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setLoading(false);
      }
    };
    getProfile();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-800 text-white flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<LoginForm />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/verification-email" element={<VerifyEmail />} />
        <Route path="/set-username" element={<Set_username />} />
      </Routes>
    </div>
  );
}

export default App;
