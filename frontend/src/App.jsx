// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import { Routes,Route} from "react-router-dom";
import Navbar from './components/Navbar';
import Friends from './pages/Friends';
import Home from './pages/Home';
import Profile from './pages/Profile'
import Signup from './pages/Signup';
import LoginForm from './pages/Login';
import VerifyEmail from "./pages/VerifyEmail";
import OpenRoute from './components/core/Auth/OpenRoute';

function App() {
  

  return (
    <div className=" relative w-screen min-h-screen bg-[#141414] flex flex-col ">
      <Navbar/>
      
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/friends" element={<Friends/>}/>
        <Route path="/profile" element = {<Profile/>}/>

        

        <Route 
              path="/login" 
              element={
                <OpenRoute>
                  <LoginForm/>
                </OpenRoute>
              }
            />
        <Route 
              path="/signup"
              element={
                <OpenRoute>
                  <Signup/>
                </OpenRoute>
              }

            />
        
        
        <Route 
              path="/verify-email" 
              element={
                <OpenRoute>
                  <VerifyEmail/>
                </OpenRoute>
              }
            />
      </Routes>
    </div>
  );
}

export default App;