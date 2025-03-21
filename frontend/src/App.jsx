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
import MusicPlayer from "./pages/Music_player"; 
import { AudioProvider } from './services/AudioProvider';

function App() {
  
  return (
    <div>
     <AudioProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<LoginForm />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/verification-email" element={<VerifyEmail />} />
        <Route path="/set-username" element={<Set_username />} />
      </Routes>
      </AudioProvider>
    </div>
  );
}

export default App;
