import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProvinceDetails =  createAsyncThunk(
    "getProvinceDetails",async(_,thunkApi)=>{
        try {
            const res = await fetch("/cards",{
                method : "GET",
                headers : {
                    "Content-Type" : "application/json"
                },
                credentials : "include"
            })
            if(!res.ok){
                const errorResponse = await res.json();
                return thunkApi.rejectWithValue(errorResponse.message || "Error getting data")
            }
            const data = await res.json();
            return data;

        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)
