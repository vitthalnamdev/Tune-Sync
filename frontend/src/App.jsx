// frontend/src/App.js
import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import LoginForm from "./pages/Login";
import VerifyEmail from "./pages/verify_Email";
import Set_username from "./pages/Set_username";
import PlaylistPage from "./pages/playlist";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { fetchProfile } from "./services/operations/auth";
import MusicPlayer from "./pages/Music_player"; 
import { AudioProvider } from './pages/contexts/AudioProvider';
import ConnectPage from "./pages/ConnectPage";
import MyFriendButton from "./components/connect_components/MyFriendButton";
import { QueueProvider } from "./pages/contexts/queueContext";
function App() {
  return (
    <div className="bg-gray-900">
      <Navbar/>  
      <MyFriendButton/>
     <QueueProvider>
     <AudioProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<LoginForm />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/verification-email" element={<VerifyEmail />} />
        <Route path="/set-username" element={<Set_username />} />
        <Route path="/playlist" element = {<PlaylistPage/>}/>
        <Route path="connect-page" element = {<ConnectPage/>}/>
      </Routes>
      </AudioProvider>
      </QueueProvider>
    </div>
  );
}

export default App;
