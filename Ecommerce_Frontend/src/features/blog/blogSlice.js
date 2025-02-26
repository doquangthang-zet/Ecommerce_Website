import React from 'react'
import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import { blogService } from './blogService';

//Get all blog
export const getAllBlog = createAsyncThunk("blog", async (category, thunkAPI) => {
    try {
        return await blogService.getBlogs(category);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

//Get one blog
export const getOneBlog = createAsyncThunk("blog/getOne", async (id, thunkAPI) => {
    try {
        return await blogService.getOneBlog(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const initialState = {
    blogs: "",
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: "",
}

export const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            getAllBlog.pending, (state) => {
                state.isLoading = true;
            }
        ).addCase(
            getAllBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.blogs = action.payload;
            }
        ).addCase(
            getAllBlog.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.error;
                if(state.isError) {
                    toast.info(action?.payload?.response?.data?.message);
                }
            }
        ).addCase(
            getOneBlog.pending, (state) => {
                state.isLoading = true;
            }
        ).addCase(
            getOneBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.currentBlog = action.payload;
            }
        ).addCase(
            getOneBlog.rejected, (state, action) => {
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

export default blogSlice.reducer;