import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div className='h-screen w-full '>
        <div className=' mt-[25vh]  grid justify-center items-center'>
          <h1 className='sm:text-4xl font-semibold text-2xl font-stretch-expanded'>Need to service your Vehicle at Next-gen Service Centre?</h1>
          <h6>We help thousands of companies hire and upskill the next generation of developers, and millions of developers to become one.</h6>
          <div className='w-full flex justify-center items-center'>
            <Link to={"/access-account"} className=' border-2 rounded-sm cursor-pointer transition delay-150 duration-300 ease-in-out hover:-translate-y-1  p-2 bg-black text-white '>Login</Link>
            <button className=' border-gray-950 border-1 cursor-pointer rounded-sm p-2 transition delay-150 duration-300 ease-in-out hover:-translate-y-1'>View All Service Centres</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home