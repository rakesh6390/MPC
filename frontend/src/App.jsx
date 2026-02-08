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
import EditProfile from './pages/EditProfile.jsx';
import Dashboard from './pages/Educator/Dashboard.jsx';
import CreateCourses from './pages/Educator/CreateCourses.jsx';
import Courses from './pages/Educator/Courses.jsx';

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
      <Route path="/editprofile" element={userData ?<EditProfile/> : <Navigate to={"/signup"}/>}/>
      <Route path = "/dashboard" element = {userData?.role==="educator"? <Dashboard/>:<Navigate to={"/signup"}/>}/>
       <Route path = "/courses" element = {userData?.role==="educator"? <Courses/>:<Navigate to={"/signup"}/>}/>
        <Route path = "/createcourse" element = {userData?.role==="educator"? <CreateCourses/>:<Navigate to={"/signup"}/>}/>
    </Routes>
    </>
  )
}
 
export default App