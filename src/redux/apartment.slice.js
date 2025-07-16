import { createSlice } from "@reduxjs/toolkit";

const apartmentSlice = createSlice({
  name: "apartment",
  initialState: {
    apartments: [],
    currentPage : 1 ,
    totalPages : 1 ,
    totalAppartments : 0,
    limit: 6
 
  },
  reducers: {
    setApartments: (state, action) => {
      state.apartments = action.payload;
    },
    setCurrentPage: (state , action) =>{
        state.currentPage = action.payload
    },
    setTotalPages: (state , action) =>{
        state.totalPages = action.payload
    },
    setTotalAppartments: (state , action) =>{
        state.totalAppartments = action.payload
    },
    setLimit : (state , action)=>{
        state.limit = action.payload
    }
  },
});

export const { setApartments , setCurrentPage , setTotalPages , setTotalAppartments , setLimit} = apartmentSlice.actions;
export default apartmentSlice.reducer;
