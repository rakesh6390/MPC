import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from "react-redux"

 export const getCurrentUser = () => {
 const dispatch = useDispatch()
 useEffect(()=> {
   const fetchUser = async ()=>{
    try {
        const result = axios.get(serverUrl + "/api/user/getCurrentUser",{withCredentials:true})
        dispatch(setUserData(result.data))
    } catch (error) {
        console.log(error)
        dispatch(setUserData(null))
    }
   }
   fetchUser()
 },[])

}