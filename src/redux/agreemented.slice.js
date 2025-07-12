import { createSlice } from "@reduxjs/toolkit";

const agreementSlice = createSlice({
    name: "agreement" ,
    initialState: {
        userAgreemented : [] ,
        allAgreements : []
    },
    reducers: {
        setUserAgreemented : (state , action)=>{
            state.userAgreemented = action.payload
        },
        setAllAgreements : (state , action)=>{
            state.allAgreements = action.payload
        }
    }
})

export const {setUserAgreemented , setAllAgreements} = agreementSlice.actions
export default agreementSlice.reducer