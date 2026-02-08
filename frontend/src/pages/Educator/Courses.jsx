import React, { useEffect } from 'react'
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { serverUrl } from '../../App';
import { toast } from 'react-toastify';
import { setCreatorCourseData } from '../../redux/courseSlice';
import img1 from "../../assets/empty.jpg"
import { FaArrowLeftLong } from "react-icons/fa6";

function Courses() {

  let navigate = useNavigate()
  let dispatch = useDispatch()

  // ----------- Getting data from Redux store -----------
  const { creatorCourseData } = useSelector(state => state.course)

  // ----------- Fetching courses when page loads -----------
  useEffect(() => {
    const getCreatorData = async () => {
      try {
        const result = await axios.get(
          serverUrl + "/api/course/getcreatorcourses",
          { withCredentials: true }
        )

        // ----------- Storing data in Redux -----------
        dispatch(setCreatorCourseData(result.data))

        console.log(result.data)

      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
      }
    }

    getCreatorData()
  }, [])

  return (
    // ----------- FULL SCREEN WRAPPER (Common for all screens) -----------
    <div className="flex min-h-screen bg-gray-100">

      {/* ----------- MAIN PAGE CONTAINER (Common for all screens) ----------- */}
      <div className="w-[100%] min-h-screen p-4 sm:p-6 bg-gray-100">

        {/* ----------- HEADER SECTION (Common for all screens) ----------- */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 ">
          <div className='flex items-center justify-center gap-3'>
            <FaArrowLeftLong
              className='w-[22px] h-[22px] cursor-pointer'
              onClick={() => navigate("/dashboard")}
            />
            <h1 className="text-xl font-semibold">Courses</h1>
          </div>

          <button
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-500"
            onClick={() => navigate("/createcourses")}
          >
            Create Course
          </button>
        </div>

        {/* ===================================================== */}
        {/*  SECTION FOR LARGE SCREENS (DESKTOP / TABLE VIEW)   */}
        {/*  This will be HIDDEN on small screens (md:hidden)   */}
        {/* ===================================================== */}

        <div className="hidden md:block bg-white rounded-xl shadow p-4 overflow-x-auto">

          {/* ----------- TABLE START (Large Screens) ----------- */}
          <table className="min-w-full text-sm">

            {/* ----------- TABLE HEADER (Column names) ----------- */}
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4">Course</th>
                <th className="text-left py-3 px-4">Price</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Action</th>
              </tr>
            </thead>

            {/* ----------- TABLE BODY (Actual data rows) ----------- */}
            <tbody>

              {/* ----------- LOOPING OVER COURSES (map) ----------- */}
              {creatorCourseData?.map((course, index) => (

                // ----------- ONE TABLE ROW PER COURSE -----------
                <tr key={index}
                  className="border-b hover:bg-gray-50 transition duration-200"
                >

                  {/* ----------- COLUMN 1: Course (Image + Title) ----------- */}
                  <td className="py-3 px-4 flex items-center gap-4">
                    {course?.thumbnail
                      ? <img
                          src={course?.thumbnail}
                          alt=""
                          className="w-25 h-14 object-cover rounded-md"
                        />
                      : <img
                          src={img1}
                          alt=''
                          className="w-14 h-14 object-cover rounded-md"
                        />
                    }
                    <span>{course?.title}</span>
                  </td>

                  {/* ----------- COLUMN 2: Price ----------- */}
                  {course?.price
                    ? <td className="py-3 px-4">₹{course?.price}</td>
                    : <td className="py-3 px-4">₹ NA</td>
                  }

                  {/* ----------- COLUMN 3: Status ----------- */}
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        course?.isPublished
                          ? "text-green-600 bg-green-100"
                          : "text-red-600 bg-red-100"
                      }`}
                    >
                      {course?.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>

                  {/* ----------- COLUMN 4: Action (Edit button) ----------- */}
                  <td className="py-3 px-4">
                    <FaEdit
                      className="text-gray-600 hover:text-blue-600 cursor-pointer"
                      onClick={() => navigate(`/addcourses/${course?._id}`)}
                    />
                  </td>

                </tr>
              ))}

            </tbody>
          </table>

          <p className="text-center text-sm text-gray-400 mt-6">
            A list of your recent courses.
          </p>

        </div>
        {/* ----------- END OF LARGE SCREEN SECTION ----------- */}



        {/* ===================================================== */}
        {/*  SECTION FOR SMALL SCREENS (MOBILE / CARD VIEW)     */}
        {/*  This will be HIDDEN on large screens (md:block)    */}
        {/* ===================================================== */}

        <div className="md:hidden space-y-4">

          {/* ----------- LOOPING OVER COURSES (map) ----------- */}
          {creatorCourseData?.map((course, index) => (

            // ----------- ONE CARD PER COURSE -----------
            <div key={index}
              className="bg-white rounded-lg shadow p-4 flex flex-col gap-3"
            >

              {/* ----------- TOP ROW: Image + Title + Edit ----------- */}
              <div className="flex gap-4 items-center">

                {course?.thumbnail
                  ? <img
                      src={course?.thumbnail}
                      alt=""
                      className="w-16 h-16 rounded-md object-cover"
                    />
                  : <img
                      src={img1}
                      alt=""
                      className="w-16 h-16 rounded-md object-cover"
                    />
                }

                <div className="flex-1">
                  <h2 className="font-medium text-sm">{course?.title}</h2>
                  {course?.price
                    ? <p className="text-gray-600 text-xs mt-1">₹{course?.price}</p>
                    : <p className="text-gray-600 text-xs mt-1">₹ NA</p>
                  }
                </div>

                <FaEdit
                  className="text-gray-600 hover:text-blue-600 cursor-pointer"
                  onClick={() => navigate(`/addcourses/${course?._id}`)}
                />
              </div>

              {/* ----------- STATUS BADGE (Published / Draft) ----------- */}
              <span
                className={`w-fit px-3 py-1 text-xs rounded-full ${
                  course?.isPublished
                    ? "text-green-600 bg-green-100"
                    : "text-red-600 bg-red-100"
                }`}
              >
                {course?.isPublished ? "Published" : "Draft"}
              </span>

            </div>
          ))}

          <p className="text-center text-sm text-gray-400 mt-4 pl-[80px]">
            A list of your recent courses.
          </p>

        </div>
        {/* ----------- END OF SMALL SCREEN SECTION ----------- */}

      </div>
    </div>
  );
}

export default Courses
