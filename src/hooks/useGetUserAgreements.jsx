import axios from 'axios'
import React, { useEffect } from 'react'
import { AGREEMENT_API_END_POINT } from '../utlis/apiEndPoints'
import { useDispatch } from 'react-redux'
import { setUserAgreemented } from '../redux/agreemented.slice'

const useGetUserAgreements = (dependency = null) => {
    const dispatch = useDispatch();
  
    useEffect(() => {
      const fetchUserAgreements = async () => {
        try {
          const res = await axios.get(
            `${AGREEMENT_API_END_POINT}/get-user-agreement`,
            { withCredentials: true }
          );
          if (res.data.success) {
            dispatch(setUserAgreemented(res.data.userAgreemented));
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchUserAgreements();
    }, [dispatch, dependency]); 
  };
  

export default useGetUserAgreements
