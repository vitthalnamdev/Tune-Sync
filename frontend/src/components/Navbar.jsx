import React from 'react'
import {Link, useNavigate } from 'react-router'

const Navbar = () => {
    const navigate = useNavigate();
  return (
    <div className='w-screen flex items-center bg-gray-500 h-[50px]'>
        <div className='w-[1200px] mx-auto items-center flex justify-between'>
            <Link to={"/"}>TuneSync</Link>
            
            <Link to={"/friends"}>
              Friends
            </Link>
               
            <Link to={"profile"}>User</Link>
        </div>

    </div>
  )
}

export default Navbar