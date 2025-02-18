import { createSlice } from "@reduxjs/toolkit";
import { getProvinceDetails } from "../../api/getProvinceDetails";
import { addProvince } from "../../api/addProvince";


const initialState = {
    provinceData : [],
    provinceDetaial : {},
    isLoading : true
}

const provinceDetailSlice = createSlice({
    name : "provinceDetail",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(getProvinceDetails.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getProvinceDetails.fulfilled,(state,action)=>{
            state.isLoading = false
            state.provinceData = action.payload

        })
        .addCase(getProvinceDetails.rejected,(state)=>{
            state.isLoading = false 
        })
        .addCase(addProvince.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(addProvince.fulfilled,(state,action)=>{
            state.isLoading = false
            state.provinceData = action.payload

        })
        .addCase(addProvince.rejected,(state)=>{
            state.isLoading = false 
        })

    }
})

const provinceDetailReducer = provinceDetailSlice.reducer;
export default provinceDetailReducer