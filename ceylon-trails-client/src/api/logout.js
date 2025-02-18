import { createAsyncThunk } from "@reduxjs/toolkit";

export const logout = createAsyncThunk(
    "logout",async(_,thunkAPI)=>{
        try {
            const res = await fetch("/auth/logout",{
                method : "GET",
                headers:{
                    "Content-Type" : "application/json",

                },
                credentials : "include"
            })
            if(!res.ok){
                const errorResponse = await res.json();
                return thunkAPI.rejectWithValue(errorResponse.message || "Error getting data")
            }
            const data = await res.json();
            return data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)