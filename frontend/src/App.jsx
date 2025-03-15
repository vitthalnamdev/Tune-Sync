// frontend/src/App.js
import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import LoginForm from "./pages/Login";
import VerifyEmail from "./pages/verify_Email";
import Set_username from "./pages/Set_username";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import {fetchProfile} from "./services/operations/auth"

function App() {
  //localStorage.getItem("token");
  // fetch all the songs from the database.
  // then send that array , to Home to display it.
  const [user , setuser] = useState({});
  const [loading , setLoading] = useState(true);
  useEffect(() => {
    const getProfile = async () => {
      try {
        const userData = await fetchProfile();
        console.log(userData);
        setuser(userData);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally{
        setLoading(false);
      }
    };
    getProfile();
  }, []);
  if (loading) return <div className="bg-gray-800 text-white flex justify-center items-center h-screen">Loading...</div>;
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home user = {user}/>} />
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
