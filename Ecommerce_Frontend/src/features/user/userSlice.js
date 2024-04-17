import React from 'react'
import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { userService } from './userService';
import { toast } from 'react-toastify';

const userFromLocalstorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

//Register
export const userRegister = createAsyncThunk("user/register", async (userData, thunkAPI) => {
    try {
        return await userService.register(userData);
    } catch (error) {
        thunkAPI.rejectWithValue(error);
    }
});

//Login
export const userLogin = createAsyncThunk("user/login", async (userData, thunkAPI) => {
    try {
        return await userService.login(userData);
    } catch (error) {
        thunkAPI.rejectWithValue(error);
    }
});

//get user wishlist
export const getWishlist = createAsyncThunk("user/wishlist", async (thunkAPI) => {
    try {
        return await userService.getUserWishlist();
    } catch (error) {
        thunkAPI.rejectWithValue(error);
    }
});

const initialState = {
    currentUser: userFromLocalstorage,
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: "",
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            userRegister.pending, (state) => {
                state.isLoading = true;
            }
        ).addCase(
            userRegister.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdUser = action.payload;
                if(state.isSuccess) {
                    toast.info("User created successfully!");
                }
            }
        ).addCase(
            userRegister.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.error;
                if(state.isError) {
                    toast.info(action.error);
                }
            }
        ).addCase(
            userLogin.pending, (state) => {
                state.isLoading = true;
            }
        ).addCase(
            userLogin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.currentUser = action.payload;
                if(state.isSuccess) {
                    localStorage.setItem("user", JSON.stringify(action.payload));
                    toast.info("User logged in successfully!");
                }
            }
        ).addCase(
            userLogin.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.error;
                if(state.isError) {
                    toast.info(action.error);
                }
            }
        ).addCase(
            getWishlist.pending, (state) => {
                state.isLoading = true;
            }
        ).addCase(
            getWishlist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.wishlist = action.payload;
            }
        ).addCase(
            getWishlist.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.error;
                if(state.isError) {
                    toast.info(action.error);
                }
            }
        );
    }
})

export default userSlice.reducer;