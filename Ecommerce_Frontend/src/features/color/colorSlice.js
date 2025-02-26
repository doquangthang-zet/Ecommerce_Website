import React from 'react'
import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import { colorService } from './colorService';

//Get all color
export const getAllColor = createAsyncThunk("color", async (thunkAPI) => {
    try {
        return await colorService.getColors();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

//Get one color
export const getOneColor = createAsyncThunk("color/getOne", async (id, thunkAPI) => {
    try {
        return await colorService.getOneColor(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const initialState = {
    colors: "",
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: "",
}

export const colorSlice = createSlice({
    name: "color",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            getAllColor.pending, (state) => {
                state.isLoading = true;
            }
        ).addCase(
            getAllColor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.colors = action.payload;
            }
        ).addCase(
            getAllColor.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.error;
                if(state.isError) {
                    toast.info(action?.payload?.response?.data?.message);
                }
            }
        ).addCase(
            getOneColor.pending, (state) => {
                state.isLoading = true;
            }
        ).addCase(
            getOneColor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.currentColor = action.payload;
            }
        ).addCase(
            getOneColor.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.error;
                if(state.isError) {
                    toast.info(action?.payload?.response?.data?.message);
                }
            }
        );
    }
})

export default colorSlice.reducer;