import { createSlice } from "@reduxjs/toolkit";

const announcementSlice = createSlice({
    name: "announcement" ,
    initialState: {
        allAnnouncements : []
    },
    reducers:{ 
        setAllAnnouncements : (state , action)=>{
        state.allAnnouncements = action.payload
    }
}
})
 export const {setAllAnnouncements } = announcementSlice.actions
 export default announcementSlice.reducer