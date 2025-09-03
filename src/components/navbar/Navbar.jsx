import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdPower } from "react-icons/io";
import { logout } from '../../store/authSlice';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  // console.log(isAuthenticated)
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleLogout=(e)=>{
    e.preventDefault()
    localStorage.removeItem("auth")
    dispatch(logout())
    toast.success("Logout Success")
    navigate("/")
    
  }
  return (
    <div className='sticky top-[20px] z-30 bg-green-500 rounded-2xl mx-auto max-w-5xl opacity-75 mb-8'>
      <div className='flex justify-between p-4 '>
        <div className='space-x-6' >
          <Link to="/">Home</Link>
          {!isAuthenticated && <Link to="/login?role=Admin">For Admin</Link>}
        </div>
        <div className='space-x-6 flex items-center'>
          <Link to="/about">About us</Link>
          <Link to="/contact">Contact us</Link>
          {isAuthenticated && <IoMdPower onClick={handleLogout} className=' cursor-pointer' size={25}/>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;