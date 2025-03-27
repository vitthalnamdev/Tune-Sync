import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import LoginForm from "./pages/Login";
import VerifyEmail from "./pages/verify_Email";
 
import PlaylistPage from "./pages/playlist";
 
import { AudioProvider } from "./pages/contexts/AudioProvider";
import { QueueProvider } from "./pages/contexts/queueContext";
import ConnectPage from "./pages/ConnectPage";
import ForgotPasswordForm from "./pages/ForgotPassword";
import ResetPasswordForm from "./pages/resetPassword";
import { ProfileProvider } from "./pages/contexts/profileContext";
import MyFriendButton from "./components/connect_components/MyFriendButton";

function App() {
  const location = useLocation(); // Get current route
  console.log("HELLO Beautiful");
  return (
    <div>
      <MyFriendButton/>
      <ProfileProvider>
        {/* Conditionally render Navbar only on the homepage */}
        <QueueProvider>
          <AudioProvider>
            <Routes>  
              <Route path="/" element={<Home />} />
              <Route path="/Signup" element={<Signup />} />
              <Route path="/Login" element={<LoginForm />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/verification-email" element={<VerifyEmail />} />
              <Route path="/playlist" element={<PlaylistPage />} />
              <Route path="/connect-page" element={<ConnectPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordForm />} />
              <Route path="/reset-password" element={<ResetPasswordForm />} />
            </Routes>
          </AudioProvider>
        </QueueProvider>
      </ProfileProvider>
    </div>
  );
}

export default App;