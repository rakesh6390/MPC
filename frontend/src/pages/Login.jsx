import React from 'react'
import logo from '../assets/logo.jpg'
import google from '../assets/google.jpeg'
import { MdOutlineRemoveRedEye } from "react-icons/md"
import { FaEye } from "react-icons/fa";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { serverUrl } from '../App';
import { toast } from 'react-toastify';
import {ClipLoader} from 'react-spinners'
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/firebase';


function Login() {
    const [show,setShow] = useState(false);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate()
    let disPatch = useDispatch()

      const handleLogin = async () => {
  setLoading(true);
  try {
    const result = await axios.post(
      serverUrl + "/api/auth/login",
      {email, password },
      { withCredentials: true }
    );
    disPatch(setUserData(result.data))
    toast.success("Login Successfully");
    navigate("/");
  } catch (error) {
    console.log(error);
    const msg =
      error.response?.data?.message ||
      "Something went wrong. Please try again.";
    toast.error(msg);
  } finally {
    setLoading(false);
  }
};
const googleLogin = async () => {
  try {
    const response = await signInWithPopup(auth, provider);
    let user = response.user
    let name = user.displayName
    let email = user.email
    let role =""

    const result = await axios.post(serverUrl+"/api/auth/googleauth",{name:name,email:email,role},{withCredentials:true})
    disPatch(setUserData(result.data))
    navigate("/")
    toast.success("Login Successfully")
  } catch (error) {
    console.error(error);
    toast.error(error.response?.data?.message || "Google signup failed");
  }
};
  return (
     <div className="bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center">
          <form className="w-[90%] md:w-[50%] h-[600px] bg-white shadow-xl rounded-2xl flex">
            {/* Left div */}
            <div className="md:w-[50%] w-[100%] flex flex-col items-center justify-center gap-3">
              <div>
                <h1 className='font-semibold text-[black] text-2xl '>Welcome back</h1>
                <h2 className='text-[#999797] text-[18px]'>Login your account</h2>
              </div>
           
              {/* Email Field */}
              <div className="flex flex-col gap-1 w-[80%]">
                <label htmlFor="email" className="font-medium">Email</label>
                <input 
                  id="email" 
                  type="email" 
                  className="w-full h-[40px] border border-[#e7e6e6] rounded-md px-3 focus:outline-none focus:border-black" 
                  placeholder="you@example.com"
                  onChange={(e)=>setEmail(e.target.value)} value={email}
                />
              </div>
                {/* Password Field */}
              <div className="flex flex-col gap-1 w-[80%] relative">
                  <label htmlFor="password" className="font-medium">Password</label>
                  <input
                   id="password"
                   type={show ? "text" : "password"}
                   className="w-full h-[40px] border border-[#e7e6e6] rounded-md px-3 pr-10
                   focus:outline-none focus:border-black"
                   placeholder="••••••••"
                   onChange={(e)=>setPassword(e.target.value)} value={password}
                  />
                 {/* Icon Toggle */}
                 {show ? (
                 <FaEye
                  onClick={() => setShow(false)}
                 className="absolute right-3 top-9 w-[20px] h-[20px] cursor-pointer text-black"
                 />
                      ) : (
                 <MdOutlineRemoveRedEye
                  onClick={() => setShow(true)}
                  className="absolute right-3 top-9 w-[20px] h-[20px] cursor-pointer text-gray-400"
                   />
                   )}
               </div>

               
          <button className='w-[80%] h-[40px] bg-[black] text-[white] flex items-center justify-center rounded-xl'  onClick={(e) => {
              e.preventDefault();
               handleLogin();
               }} disabled={loading}>
            {loading?<ClipLoader size={30} color='white'/>:"Login"}
          </button>

          <span className='text-13px cursor-pointer text-[#585757]' onClick={()=>navigate("/forget")} >Forgot Your Password?</span>
          
               
                <div className="w-[80%] flex items-center gap-2">
                 <div className="flex-1 h-[1px] bg-[#c4c4c4]"></div>
                 <span className="text-[15px] text-[#6f6f6f]">or continue</span>
                 <div className="flex-1 h-[1px] bg-[#c4c4c4]"></div>
                </div>


              <div className='w-[80%] h-[40px] border-1 border-[black] rounded-[5px] flex items-center justify-center' onClick={googleLogin}>
                <img src={google} className='w-[25px]' alt="" />
                <span className='text-[18px] text-gray-500'>OOgle</span>
              </div>
              {/* SignUp Redirect */}
          <div className='text-[#6f6f6f]'>
             Create an account!<span className='underline underline-offset-1 text-black' onClick={()=>navigate("/signup")}>SignUp</span>
          </div>
            </div>
    
            {/* Right div */}
            <div className="md:w-[50%] h-full rounded-r-2xl bg-black hidden md:flex items-center justify-center flex-col">
              <img src={logo} alt="logo" className="w-32 mb-4" />
              <span className="text-2xl text-white">
                VIRTUAL COURSES
              </span>
            </div>
          </form>
        </div>
  )
}

export default Login