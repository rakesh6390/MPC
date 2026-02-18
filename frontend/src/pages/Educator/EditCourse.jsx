import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";

function EditCourse() {
  const navigate = useNavigate()
  const [isPublished,setIsPublished] =useState(false)
  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">

      {/*Top bar*/}

      <div className="flex items-center justify-center gap-[20px] md:justify-between flex-col md:flex-row  mb-6 relative">
        <FaArrowLeftLong  className='top-[-20%] md:top-[20%] absolute left-[0] md:left-[2%] w-[22px] h-[22px] cursor-pointer' onClick={()=>navigate("/courses")}/>

          <h2 className="text-2xl font-semibold md:pl-[60px]">
            add detail information regarding the course
          </h2>
          <div className="space-x-2 space-y-2 ">
            <button className="bg-black text-white px-4 py-2 rounded-md" onClick={()=>navigate(`/createlecture/${selectedCourse?._id}`)}>
              go to lecture page
            </button>
          </div>

      </div>

      {/*form detail*/}

      <div  className="bg-gray-50 p-6 rounded-md">
           <h2 className="text-lg font-medium mb-4">
           Basic Course Information
           </h2>
          <div className="space-x-2 space-y-2 ">
          {!isPublished? <button className="bg-green-100 text-green-600 px-4 py-2 rounded-md border-1" onClick={()=>setIsPublished(prev=>!prev)}>Click to Publish</button> 
          :<button className="bg-red-100 text-red-600 px-4 py-2 rounded-md border-1" onClick={()=>setIsPublished(prev=>!prev)}>Click to UnPublish</button>
          }
          <button className="bg-red-600 text-white px-4 py-2 rounded-md" disabled={loading} onClick={removeCourse}>{loading?<ClipLoader size={30} color='white'/> :"Remove Course"}</button>
        </div>

           <form className="space-y-6">
            <div>
              <label htmlFor=""></label>
            </div>

           </form>

      </div>

    </div>
  )
}

export default EditCourse