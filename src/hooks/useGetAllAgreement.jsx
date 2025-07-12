import axios from 'axios'
import React, { useEffect } from 'react'
import { AGREEMENT_API_END_POINT } from '../utlis/apiEndPoints'
import { useDispatch } from 'react-redux'
import { setAllAgreements } from '../redux/agreemented.slice'

const useGetAllAgreement = (dependency= null) => {
    const dispatch = useDispatch()
  useEffect(()=>{
       const fetchAllAgreement = async ()=>{
            try {
                const res = await axios.get(`${AGREEMENT_API_END_POINT}/agreements` , {withCredentials: true})
                if(res.data.success){
                    dispatch(setAllAgreements(res.data.agreements))
                }
            } catch (error) {
                console.log(error)
            }
       }
       fetchAllAgreement()
  } , [dispatch ,dependency])
}

export default useGetAllAgreement
