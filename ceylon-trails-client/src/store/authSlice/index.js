import { createSlice } from "@reduxjs/toolkit";
import { register } from "../../api/register";
import { login } from "../../api/login";
import { checkAuth } from "../../api/checkAuth";
import { logout } from "../../api/logout";
import { toast } from "react-toastify";


const initialState = {
    isAuthenticate: false,
    user: null,
    token: null,
    role : null,
    isLoading: true
}


const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
            state.role = action.payload.role
            state.isAuthenticate = true
        },
        logOutUser: (state) => {
            state.user = null
            state.token = null
            state.role = null
            state.isAuthenticate = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload.user
                state.token = action.payload.token
                state.isAuthenticate = true
            })
            .addCase(register.rejected, (state) => {
                state.isLoading = false
                state.user = null
                state.token = null
                state.isAuthenticate = false
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload.user
                state.token = action.payload.token
                state.role = action.payload.role
                state.isAuthenticate = true
                //console.log("Role from redux", state.role);
                
            })
            .addCase(login.rejected, (state) => {
                state.isLoading = false
                state.user = null
                state.isAuthenticate = false
            })
            .addCase(checkAuth.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(checkAuth.fulfilled,(state,action)=>{
                state.isLoading = false
                state.user = action.payload.user
                state.token = action.payload.token
                state.isAuthenticate = true
            })
            .addCase(checkAuth.rejected,(state)=>{
                state.isLoading = false
                state.user = null
                state.isAuthenticate = false
            })
            .addCase(logout.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(logout.fulfilled,(state)=>{
                state.isLoading = false
                state.user = null
                state.token = null
                state.isAuthenticate = false
               
            })
            .addCase(logout.rejected,(state)=>{
                state.isLoading = false
            })
    }
})

export const { setUser , logOutUser } = auth.actions
export default auth.reducer