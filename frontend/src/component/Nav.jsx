import React, { useState } from 'react'
import logo from "../assets/logo.jpg"
import { IoPersonCircleSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import { toast } from 'react-toastify';
import axios from 'axios';
import { setUserData } from '../redux/userSlice';
import { RxHamburgerMenu } from "react-icons/rx";
import { GiSplitCross } from "react-icons/gi";

function Nav() {
  const {userData} = useSelector((state) => state.user);
  const navigate = useNavigate();
  let dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showHam,setShowHam] = useState(false);

    const handleLogout = async () =>{
    try{
      const result = await axios.get(serverUrl + "/api/auth/logout",{withCredentials:true} )
    console.log(result.data)
    await dispatch(setUserData(null))
    toast.success("LogOut Successfully")
   }catch(error){
    console.log(error.response.data.message)
   }
  }

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
       <div className='w-[30%] lg:flex items-center justify-center gap-4 hidden'>

          {!userData && <IoPersonCircleSharp className='text-white lg:text-4xl fill-black text-3xl cursor-pointer' onClick={()=>setShow(!show)}/>}

          {userData?.photoUrl ? <img src={userData.photoUrl} className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black  border-white cursor-pointer" onClick={()=>setShow(!show)}/>:<div className='w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black  border-white cursor-pointer' onClick={()=>setShow(!show)} >{userData?.name.slice(0,1).toUpperCase()} </div>}

          {userData?.role == "educator" ? <div className='flex items-center justify-center gap-2 text-[18px] text-white border-[2px] border-[#fdfbfb7a] bg-[#000000d5] rounded-lg w-[150px] h-[60px]' onClick={()=>navigate("/dashboard")}>Dashboard</div> :""}

          {!userData ?<span className='px-[20px] py-[10px] border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light cursor-pointer' onClick={()=>navigate("/login")}>login</span>:

          <span className='px-[20px] py-[10px] border-2 text-black bg-white rounded-[10px] text-[18px] cursor-pointer shadow-sm' onClick={handleLogout}>logout</span>}

          {show && <div className=' absolute top-[110%] right-[15%] flex items-center flex-col justify-center gap-2 text-[16px] rounded-md bg-[white] px-[15px] py-[10px] border-[2px]  border-black hover:border-white hover:text-white cursor-pointer hover:bg-black  '>

            <span className='bg-[black] text-white  px-[30px] py-[10px] rounded-2xl hover:bg-gray-600' onClick={()=>{navigate("/profile")}} >My Profile</span>
            <span className='bg-[black] text-white hover:bg-gray-600  px-[25px] py-[10px] rounded-2xl'>My Courses</span>

          </div>}
          
        </div>
        <RxHamburgerMenu className='w-[30px] h-[30px] lg:hidden fill-white cursor-pointer' onClick={()=>setShowHam(prev=>!prev)} />

          <div className={`fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#000000d6] flex items-center justify-center flex-col gap-5 z-10 lg:hidden ${showHam ? "translate-x-[0] transition duration-600 " : "translate-x-[-100%] transition duration-600 " } `}>
           <GiSplitCross className='w-[35px] h-[35px] fill-white absolute top-5 right-[4%] ' onClick={()=>setShowHam(prev=>!prev)} />

             {!userData && <IoPersonCircleSharp className='text-white lg:text-4xl fill-white text-3xl cursor-pointer'/>}
             {userData?.photoUrl ? <img src={userData.photoUrl} className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black  border-white cursor-pointer" onClick={()=>setShow(!show)}/>:<div className='w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black  border-white cursor-pointer' onClick={()=>setShow(!show)} >{userData?.name.slice(0,1).toUpperCase()} </div>}

           <div className='flex items-center justify-center gap-2 text-[18px] text-white border-[2px] border-[#fdfbfb7a] bg-[#000000d5] rounded-lg w-[200px] h-[65px] ' onClick={()=>navigate("/myProfile")}>My Courses</div> 

           <div className='flex items-center justify-center gap-2 text-[18px] text-white border-[2px] border-[#fdfbfb7a] bg-[#000000d5] rounded-lg w-[200px] h-[65px] ' onClick={()=>navigate("/profile")}>My Profile</div>

            {userData?.role == "educator" ? <div className='flex items-center justify-center gap-2 text-[18px] text-white border-[2px] border-[#fdfbfb7a] bg-[#000000d5] rounded-lg w-[200px] h-[65px]' onClick={()=>navigate("/dashboard")}>Dashboard</div> :""}

             {!userData ?<span className='flex items-center justify-center gap-2 text-[18px] text-white border-[2px] border-[#fdfbfb7a] bg-[#000000d5] rounded-lg w-[200px] h-[65px]' onClick={()=>navigate("/login")}>login</span>:

          <span className='flex items-center justify-center gap-2 text-[18px] text-white border-[2px] border-[#fdfbfb7a] bg-[#000000d5] rounded-lg w-[200px] h-[65px]' onClick={handleLogout}>logout</span>}

          </div>
      </div>
    </div>
  )
}

export default Nav
