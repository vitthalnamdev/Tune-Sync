// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Profile from './pages/Profile'
import Signup from './pages/Signup';
import LoginForm from './pages/Login';
import VerifyEmail from "./pages/VerifyEmail";
import OpenRoute from './components/core/Auth/OpenRoute';
import { Routes, Route} from "react-router-dom";;
 

function App() {
  
  // fetch all the songs from the database.
  // then send that array , to Home to display it.
  
  return (
    <div>



    <Home/>
     {/*<Navbar/>*/}

     {/* <Routes>*/}
     {/*   <Route path="/" element={<Home/>}/>*/}
     {/*   <Route path="/friends" element={<Friends/>}/>*/}
     {/*   <Route path="/profile" element = {<Profile/>}/>*/}

     {/*   <Route path="/sign-up" element = {<Signup/>}/>*/}
     {/* </Routes> */}
    </div>
  );
}

export default App;