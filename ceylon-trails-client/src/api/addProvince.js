import { createAsyncThunk } from "@reduxjs/toolkit";

export const addProvince = createAsyncThunk(
    'addProvince',
    async (provinceDetails, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('/cards', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(provinceDetails),
            });
            if (!res.ok) {
                const errorResponse = await res.json();
                return thunkAPI.rejectWithValue(errorResponse.message || 'Error adding province');
            }
            const data = await res.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);