import axios from 'axios';
import React, { useEffect } from 'react';
import { APARTMENT_API_END_POINT } from '../utlis/apiEndPoints';
import { useDispatch, useSelector } from 'react-redux';
import {
  setApartments,
  setTotalAppartments,
  setTotalPages,
} from '../redux/apartment.slice';

const useGetApartmentList = ({ rentMin = "", rentMax = "" , dependency = null} = {}) => {
  const dispatch = useDispatch();
  const { limit, currentPage } = useSelector((store) => store.apartment);

  useEffect(() => {
    const fetchApartment = async () => {
      try {
        const queryParams = new URLSearchParams({
          page: currentPage || 1,
          limit: limit || 10,
        });

        // Rent range filter
        if (rentMin) queryParams.append("rentMin", rentMin);
        if (rentMax) queryParams.append("rentMax", rentMax);

        const res = await axios.get(
          `${APARTMENT_API_END_POINT}/apartments?${queryParams.toString()}`,
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
  }, [dispatch, currentPage, limit, rentMin, rentMax , dependency]);
};

export default useGetApartmentList;
