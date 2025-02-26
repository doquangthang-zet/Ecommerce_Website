import React from 'react'
import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import { enquiryService } from './enquiryService';

//Get all enquiry
export const getAllEnquiry = createAsyncThunk("enquiry", async (thunkAPI) => {
    try {
        return await enquiryService.getEnquirys();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

//Get one enquiry
export const getOneEnquiry = createAsyncThunk("enquiry/getOne", async (id, thunkAPI) => {
    try {
        return await enquiryService.getOneEnquiry(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

//send one enquiry
export const postEnquiry = createAsyncThunk("enquiry/create", async (data, thunkAPI) => {
    try {
        return await enquiryService.sendEnquiry(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const initialState = {
    enquirys: "",
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: "",
}

export const enquirySlice = createSlice({
    name: "enquiry",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            getAllEnquiry.pending, (state) => {
                state.isLoading = true;
            }
        ).addCase(
            getAllEnquiry.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.enquirys = action.payload;
            }
        ).addCase(
            getAllEnquiry.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.error;
                if(state.isError) {
                    toast.info(action?.payload?.response?.data?.message);
                }
            }
        ).addCase(
            getOneEnquiry.pending, (state) => {
                state.isLoading = true;
            }
        ).addCase(
            getOneEnquiry.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.currentEnquiry = action.payload;
            }
        ).addCase(
            getOneEnquiry.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.error;
                if(state.isError) {
                    toast.info(action?.payload?.response?.data?.message);
                }
            }
        ).addCase(
            postEnquiry.pending, (state) => {
                state.isLoading = true;
            }
        ).addCase(
            postEnquiry.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdEnquiry = action.payload;
                if(state.isSuccess) {
                    toast.info("Enquiry sent successfully!");
                }
            }
        ).addCase(
            postEnquiry.rejected, (state, action) => {
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

export default enquirySlice.reducer;