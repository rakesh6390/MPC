import React from 'react'
import logo from "../assets/logo.png"
import { IoPersonCircleSharp } from "react-icons/io5";

function Nav() {
  return (
    <div>
      <div className='w-[100%] h-[70px] fixed top-0 px-[20px] py-[10px] flex items-center justify-between bg-[#00000047] z-10'>
        <div className='lg:w-[20%] w-[40%] lg:pl-[50px]'>
          <img
            src={logo}
            alt=""
            className='w-[60px] rounded-[5px] border-2 border-white '
          />
        </div>
        <div className='lg:flex w-[30%] flex justify-center items-center gap-4'>
          <IoPersonCircleSharp className='text-white lg:text-4xl fill-black text-3xl cursor-pointer'/>
          <div className = 'px-[20px] py-[10p'>Dashboard</div>
        </div>
      </div>
    </div>
  )
}

export default Nav
