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
  

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
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
