import { createAsyncThunk } from "@reduxjs/toolkit";

export const register = createAsyncThunk(
    "register",
    async (registerData, thunkAPI) => {
        try {
            const res = await fetch("/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registerData),
                credentials: "include",
            });

            if (!res.ok) {
                const errorResponse = await res.json();
                return thunkAPI.rejectWithValue(errorResponse.message || "Registration failed");
            }

            const data = await res.json();

            const authorizationHeader =
                res.headers.get("Authorization") || res.headers.get("authorization");

            if (!authorizationHeader) {
                console.warn("Authorization header not found");
                return thunkAPI.rejectWithValue("Token not found in response headers");
            }

            const token = authorizationHeader.replace("Bearer ", "");
            return { user: data, token };

        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
