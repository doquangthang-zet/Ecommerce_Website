import React from 'react'
import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import { prodCateService } from './productCateService';

//Get all prodCate
export const getAllProdCate = createAsyncThunk("prodCate", async (thunkAPI) => {
    try {
        return await prodCateService.getProdCates();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

//Get one prodCate
export const getOneProdCate = createAsyncThunk("prodCate/getOne", async (id, thunkAPI) => {
    try {
        return await prodCateService.getOneProdCate(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const initialState = {
    prodCates: "",
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: "",
}

export const prodCateSlice = createSlice({
    name: "prodCate",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            getAllProdCate.pending, (state) => {
                state.isLoading = true;
            }
        ).addCase(
            getAllProdCate.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.prodCates = action.payload;
            }
        ).addCase(
            getAllProdCate.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.error;
                if(state.isError) {
                    toast.info(action?.payload?.response?.data?.message);
                }
            }
        ).addCase(
            getOneProdCate.pending, (state) => {
                state.isLoading = true;
            }
        ).addCase(
            getOneProdCate.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.currentProdCate = action.payload;
            }
        ).addCase(
            getOneProdCate.rejected, (state, action) => {
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

export default prodCateSlice.reducer;