import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../App";
import { toast } from "react-toastify";
import { setCreatorCourseData } from "../redux/courseSlice";
import axios from "axios";

const getCreatorCourseData = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const getCreatorData = async () => {
      try {
        const result = await axios.get(
          serverUrl + "/api/course/getcreatorcourses",
          { withCredentials: true }
        );

        dispatch(setCreatorCourseData(result.data));
        console.log(result.data);
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Failed to fetch courses");
      }
    };

    getCreatorData();
  }, [userData, dispatch]);
};

export default getCreatorCourseData;
