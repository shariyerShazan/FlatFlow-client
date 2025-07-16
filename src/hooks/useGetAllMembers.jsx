import axios from 'axios'
import React, { useEffect } from 'react'
import { USER_API_END_POINT } from '../utlis/apiEndPoints'
import { useDispatch } from 'react-redux'
import { setMembers } from '../redux/user.slice'

const useGetAllMembers = (dependency = null) => {
    const dispatch = useDispatch()
  useEffect(()=>{
    const fetchAllMembers = async ()=>{
    try {
        
const res = await axios.get(`${USER_API_END_POINT}/get-all-members` , {withCredentials: true})
if(res.data.success){
    dispatch(setMembers(res.data.members))
}
       
    } catch (error) {
        console.log(error)
    }}
    fetchAllMembers()
  },[dispatch , dependency])
}

export default useGetAllMembers
