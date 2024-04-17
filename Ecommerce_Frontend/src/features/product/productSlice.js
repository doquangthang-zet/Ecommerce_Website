import React from 'react'
import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import { productService } from './productService';

//Get all product
export const getAllProduct = createAsyncThunk("product", async (thunkAPI) => {
    try {
        return await productService.getProducts();
    } catch (error) {
        thunkAPI.rejectWithValue(error);
    }
});

//Add to wishlist
export const addWishlist = createAsyncThunk("product/addWishlist", async (prodId, thunkAPI) => {
    try {
        return await productService.addToWishlist(prodId);
    } catch (error) {
        thunkAPI.rejectWithValue(error);
    }
});

const initialState = {
    products: "",
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: "",
}

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            getAllProduct.pending, (state) => {
                state.isLoading = true;
            }
        ).addCase(
            getAllProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.products = action.payload;
            }
        ).addCase(
            getAllProduct.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.error;
                if(state.isError) {
                    toast.info(action.error);
                }
            }
        ).addCase(
            addWishlist.pending, (state) => {
                state.isLoading = true;
            }
        ).addCase(
            addWishlist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.addWishlist = action.payload;
                if(state.isSuccess) {
                    toast.info("Product added/removed wishlist!");
                }
            }
        ).addCase(
            addWishlist.rejected, (state, action) => {
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

export default productSlice.reducer;