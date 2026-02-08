import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function CreateCourses() {
  let navigate = useNavigate();
  let [loading,setLoading] = useState(false);
  const [title,setTitle] = useState("")
  const [category,setCategory] = useState("");

  const CreateCourseHandler=async()=>{
    setLoading(true);
    try {
      const result = await axios.post(serverUrl+"/api/course/create",{title,category},{withCredentials:true});

      console.log(result.data);

      toast.success("Course Created");
            navigate("/courses");   // Redirect to courses page
            setTitle("");           // Reset title field
            setLoading(false);
    } catch (error) {
       setLoading(false);
            toast.error(error.response.data.message);
    }
  }
  return (
    // FULL PAGE CONTAINER
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
   {/* ----------- CARD / FORM CONTAINER ----------- */}
   <div className="max-w-xl w-[600px] mx-auto p-6 bg-white shadow-md rounded-md mt-10 relative">
      <FaArrowLeftLong
                    className="top-[8%] absolute left-[5%] w-[22px] h-[22px] cursor-pointer"
                    onClick={() => navigate("/courses")}
                />
         {/* ----------- PAGE TITLE ----------- */}
         <h2 className="text-2xl font-semibold mb-6 text-center">
                    Create Course
                </h2>
              
                {/* ----------- FORM START ----------- */}          
             <form className="space-y-5" onSubmit={(e)=>e.preventDefault()}>
                {/* ----------- COURSE TITLE INPUT ----------- */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                <input type="text" placeholder="Enter course Title" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[black]" onChange={(e)=>setTitle(e.target.value)} value={title}/>
              </div>
              {/*category select*/}
              <div>
                <select className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[black]" onChange={(e)=>setCategory(e.target.value)}>
                  <option value="">Select Category
                  </option>
                  <option value="App Development">App Development</option>
                  <option value="AI/ML">AI/ML</option>
                  <option value="AI/TOOLS">AI/TOOLS</option>
                  <option value="DATA SCIENCE">DATA SCIENCE</option>
                  <option value="Data Analytics">Data Analytics</option>
                            <option value="Ethical Hacking">Ethical Hacking</option>
                            <option value="UI UX Designing">UI UX Designing</option>
                            <option value="Web Development">Web Development</option>
                            <option value="Others">Others</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-[black] text-white py-2 px-4 rounded-md active:bg-[#3a3a3a] transition"
              disabled={CreateCourseHandler}>
                {loading?<ClipLoader size={30} color="white"/>:"Create"}
              </button>
             </form>
              {/* ----------- FORM END ----------- */}
   </div>
    </div>
  )
}

export default CreateCourses