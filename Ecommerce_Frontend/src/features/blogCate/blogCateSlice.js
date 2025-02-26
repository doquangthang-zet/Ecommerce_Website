import React from 'react'
import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import { blogCateService } from './blogCateService';

//Get all blogCate
export const getAllBlogCate = createAsyncThunk("blogCate", async (thunkAPI) => {
    try {
        return await blogCateService.getBlogCates();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

//Get one blogCate
export const getOneBlogCate = createAsyncThunk("blogCate/getOne", async (id, thunkAPI) => {
    try {
        return await blogCateService.getOneBlogCate(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const initialState = {
    blogCates: "",
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: "",
}

export const blogCateSlice = createSlice({
    name: "blogCate",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            getAllBlogCate.pending, (state) => {
                state.isLoading = true;
            }
        ).addCase(
            getAllBlogCate.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.blogCates = action.payload;
            }
        ).addCase(
            getAllBlogCate.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.error;
                if(state.isError) {
                    toast.info(action?.payload?.response?.data?.message);
                }
            }
        ).addCase(
            getOneBlogCate.pending, (state) => {
                state.isLoading = true;
            }
        ).addCase(
            getOneBlogCate.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.currentBlogCate = action.payload;
            }
        ).addCase(
            getOneBlogCate.rejected, (state, action) => {
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

export default blogCateSlice.reducer;