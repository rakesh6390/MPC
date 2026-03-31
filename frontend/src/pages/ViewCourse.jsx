import React from 'react'
import { setSelectedCourseData } from '../redux/courseSlice';

function ViewCourse() {

const {courseId} = useParams();
const navigate = useNavigate()
const {courseData} = useselector(state=>state.course)
const {userData} = useSelector(state=>state.user)
const [creatorData , setCreatorData] = useState(null)
const dispatch = useDispatch()
const [selectedLecture, setSelectedLecture] = useState(null);
const {lectureData} = useSelector(state=>state.lecture)
const {selectedCourseData} = useSelector(state=>state.course)
const [selectedCreatorCourse,setSelectedCreatorCourse] = useState([])
const [isEnrolled, setIsEnrolled] = useState(false);
const [rating, setRating] = useState(0);
const [comment, setComment] = useState("");

const handleReview = async () =>{
  try {
    const result = await  axios.post(serverUrl+"/api/review/givereview",{rating ,comment,courseId},{withcredentials:true})
    toast.success("Review added")
    console.log(result.data)
    setRating(0)
    setCommnent("")
  } catch (error) {
    console.log(error)
    toast.error(error.response.data.message)
  }
}

const calculateAverageRating = (reviews) =>{
  if(!reviews || reviews.length === 0) return 0;

  const total = reviews.reduce((sum,review)=>sum+review.rating,0);
  return (total/reviews.length).toFixed(1);
}

const avgRating = calculateAverageRating(selectedCourseData?.reviews);
console.log("Average Rating:",avgRating);


const fetchCourseData = () => {
  const course = courseData.find(item => item._id === courseId);

  if (course) {
    dispatch(setSelectedCourseData(course));
    console.log(course);
  }
}

const checkEnrollment = ()=>{
  const verify = userData?.enrolledCourses?.some(c=>{
    const enrolledId = typeof c === 'string' ? c:c._id;
    return enrolledId?.toString() === courseId?.toString();
  });

  console.log("Enrollment Verified:",verify);
  if(verify){
    setIsEnrolled(true);
  }
}

useEffect(()=>{
  fetchCourseData()
  checkEnrollment()
},[courseId,courseData,lectureData])



  return (
    <div>ViewCourse</div>
  )
}

export default ViewCourse