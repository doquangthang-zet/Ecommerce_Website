import React from 'react'
import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import { brandService } from './brandService';

//Get all brand
export const getAllBrand = createAsyncThunk("brand", async (thunkAPI) => {
    try {
        return await brandService.getBrands();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

//Get one brand
export const getOneBrand = createAsyncThunk("brand/getOne", async (id, thunkAPI) => {
    try {
        return await brandService.getOneBrand(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const initialState = {
    brands: "",
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: "",
}

export const brandSlice = createSlice({
    name: "brand",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            getAllBrand.pending, (state) => {
                state.isLoading = true;
            }
        ).addCase(
            getAllBrand.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.brands = action.payload;
            }
        ).addCase(
            getAllBrand.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.error;
                if(state.isError) {
                    toast.info(action?.payload?.response?.data?.message);
                }
            }
        ).addCase(
            getOneBrand.pending, (state) => {
                state.isLoading = true;
            }
        ).addCase(
            getOneBrand.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.currentBrand = action.payload;
            }
        ).addCase(
            getOneBrand.rejected, (state, action) => {
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

export default brandSlice.reducer;