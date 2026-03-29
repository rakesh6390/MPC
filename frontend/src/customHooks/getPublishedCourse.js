import axios from 'axios'
import React from 'react'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setCourseData } from '../redux/courseSlice'
import { useEffect } from 'react'

const getPublishedCourse = () => {
const dispatch = useDispatch()

    useEffect(() => {
      const gettCourseData = async () =>{
        try {
            const result = await axios.get(serverUrl+"/api/course/getpublished",{withCredentials:true})
            dispatch(setCourseData(result.data))
            console.log(result.data)
        } catch (error) {
            console.error('Error fetching published course data:', error)
        }
      }
        gettCourseData()
    }, [])
  
}

export default getPublishedCourse