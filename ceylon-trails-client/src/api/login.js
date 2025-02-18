import { createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
    "login",async(loginData , thunkAPI)=>{
        try {
            const res = await fetch("/auth/login",{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                },

                body : JSON.stringify(loginData),
                credentials : "include"
            })
            if(!res.ok){
                const errorResponse = await res.json();
                return thunkAPI.rejectWithValue(errorResponse.message || "Login failed")
            }

            const data = await res.json();

            const authorizationHeader = res.headers.get("Authorization") || res.headers.get("authorization");
            const roleHeader = res.headers.get("role")

            if (!authorizationHeader) {
                console.warn("Authorization header not found");
                return thunkAPI.rejectWithValue("Token not found in response headers");
            }

            const token = authorizationHeader.replace("Bearer ", "");

            //console.log("Role from API:", roleHeader);
            console.log("Token from API:", token);
            localStorage.setItem("token", token);


            return {user : data , token : token, role : roleHeader}

        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)