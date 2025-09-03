import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const MechanicLoginPage = () => {
  const navigate=useNavigate()
  const handleClick=(e)=>{
    e.preventDefault()
    navigate('/mechanic-login')
  }
  return (
     <div className="flex items-center justify-center min-h-screen">
        <div className=" text-white shadow-2xl rounded-xl p-10 w-96">
            <h2 className="text-2xl font-bold mb-1 text-center text-green-500">For Mechanics</h2>
            <p className=" mb-6 text-center text-black">Thousands of mechanics have switched to a better way to work. They're building their 
              skills, reputation, and careers</p>
 
            <form className="flex flex-col space-y-4">
                <button type="submit" onClick={handleClick} className="bg-green-600 cursor-pointer  hover:bg-green-700 text-white py-3 rounded font-semibold transition duration-300">
                    Login
                </button><br /><br />
            </form>
            <p className="mt-6 text-center text-gray-400"> Don't have an account?{" "}
                <Link to={`/mechanic-register`} className="text-green-400 hover:underline">Sign Up</Link>
            </p>
        </div>
    </div>
  )
}

export default MechanicLoginPage