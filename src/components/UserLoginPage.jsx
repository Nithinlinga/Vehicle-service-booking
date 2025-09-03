import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const UserLoginPage = () => {
  const navigate=useNavigate()
  const handleClick=(e)=>{
    e.preventDefault()
    navigate('/user-login')
  }
  return (
    <div className="flex items-center justify-center min-h-screen">
        <div className=" text-white shadow-2xl rounded-xl p-10 w-96">
            <h2 className="text-2xl font-bold mb-1 text-center text-green-500">For Users</h2>
            <p className=" mb-6 text-center text-black">Thousands of drivers have switched to a smarter 
              way to service their cars. Experience the difference.</p>
 
            <form className="flex flex-col space-y-4">
                <button type="submit" onClick={handleClick} className="bg-green-600 cursor-pointer  hover:bg-green-700 text-white py-3 rounded font-semibold transition duration-300">
                    Login
                </button><br /><br />
            </form>
            <p className="mt-6 text-center text-gray-400"> Don't have an account?{" "}
                <Link to="/user-register" className="text-green-400 hover:underline">Sign Up</Link>
            </p>
        </div>
    </div>
  )
}

export default UserLoginPage