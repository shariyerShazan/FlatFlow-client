import axios from 'axios';
import React, { useEffect } from 'react';
import { APARTMENT_API_END_POINT } from '../utlis/apiEndPoints';
import { useDispatch, useSelector } from 'react-redux';
import {
  setApartments,
  setTotalAppartments,
  setTotalPages,
} from '../redux/apartment.slice';

const useGetApartmentList = (dependency = null) => {
  const dispatch = useDispatch();
  const { limit, currentPage } = useSelector((store) => store.apartment);

  useEffect(() => {
    const fetchApartment = async () => {
      try {
        const res = await axios.get(
          `${APARTMENT_API_END_POINT}/apartments?page=${currentPage || 1}&limit=${limit ||10}`,
          { withCredentials: true } 
        );

        if (res.data.success) {
          dispatch(setApartments(res.data.apartments));
          dispatch(setTotalPages(res.data.totalPages)); 
          dispatch(setTotalAppartments(res.data.totalAppartments));
        }
      } catch (error) {
        console.log(
          error?.response?.data?.message || 'Failed to fetch apartments'
        );
      }
    };

    fetchApartment();
  }, [dispatch, currentPage, limit , dependency]);
};

export default useGetApartmentList;
