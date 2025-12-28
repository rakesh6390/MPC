import React, { useEffect } from 'react'
import {Route,Routes} from 'react-router-dom'
import { Navigate } from "react-router-dom";
import Home from './pages/Home.jsx'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
export const serverUrl = "http://localhost:3000"
import {ToastContainer} from 'react-toastify'
import Profile from './pages/Profile.jsx'
import { useSelector } from 'react-redux'
import getCurrentUser from './customHooks/getCurrentUser.js';
import ForgetPassword from './pages/ForgetPassword.jsx';

function App() {
 getCurrentUser()
  
  const {userData} = useSelector(state=>state.user)
  
  return (
    <>
    <ToastContainer/>
    <Routes>
      <Route path = "/" element={<Home/>}/>
      <Route path = "/signup" element={!userData?<Signup/> : <Navigate to ={"/"}/>}/>
      <Route path = "/login" element={<Login/>}/>
      <Route path = "/profile" element={userData?<Profile/> : <Navigate to ={"/signup"}/>}/>
      {/* <Route path="/forget" element={<ForgetPassword/>}/> */}
      <Route path = "/forget"element={<ForgetPassword />} />
    </Routes>
    </>
  )
}
 
export default App