// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import { Routes,Route} from "react-router-dom";
import Navbar from './components/Navbar';
import Friends from './pages/Friends';
import Home from './pages/Home';
import Profile from './pages/Profile'
import Signup from './pages/Signup';

function App() {
  

  return (
    <div>
      <Navbar/>
      
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/friends" element={<Friends/>}/>
        <Route path="/profile" element = {<Profile/>}/>

        <Route path="/sign-up" element = {<Signup/>}/>
      </Routes>
    </div>
  );
}

export default App;