import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    totalUser: 0 ,
    totalMember: 0,
    members : []
 
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setTotalUser: (state, action) => {
      state.totalUser = action.payload;
    },
    setTotalMember: (state, action) => {
      state.totalMember = action.payload;
    } ,
    setMembers : (state , action)=>{
      state.members = action.payload
    }
  },
});

export const { setUser , setTotalUser , setTotalMember , setMembers} = userSlice.actions;
export default userSlice.reducer;
