import React from 'react'
import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import { productService } from './productService';

//Get all product
export const getAllProduct = createAsyncThunk("product", async (filter, thunkAPI) => {
    try {
        return await productService.getProducts(filter);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

//Get one product
export const getOneProduct = createAsyncThunk("product/getOne", async (id, thunkAPI) => {
    try {
        return await productService.getOneProduct(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

//Add to wishlist
export const addWishlist = createAsyncThunk("product/addWishlist", async (prodId, thunkAPI) => {
    try {
        return await productService.addToWishlist(prodId);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

//Rate product
export const writeRating = createAsyncThunk("product/rate", async (data, thunkAPI) => {
    try {
        return await productService.rateProduct(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
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
                    toast.info(action?.payload?.response?.data?.message);
                }
            }
        ).addCase(
            getOneProduct.pending, (state) => {
                state.isLoading = true;
            }
        ).addCase(
            getOneProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.currentProduct = action.payload;
                state.message = "Product fetched successfully!"
            }
        ).addCase(
            getOneProduct.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.error;
                if(state.isError) {
                    toast.error(action?.payload?.response?.data?.message);
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
                    toast.success("Product added/removed wishlist!");
                }
            }
        ).addCase(
            addWishlist.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.error;
                if(state.isError) {
                    toast.error(action?.payload?.response?.data?.message);
                }
            }
        ).addCase(
            writeRating.pending, (state) => {
                state.isLoading = true;
            }
        ).addCase(
            writeRating.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.writeRating = action.payload;
                if(state.isSuccess) {
                    toast.success("Product rated successfully!");
                }
            }
        ).addCase(
            writeRating.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.error;
                if(state.isError) {
                    toast.error(action?.payload?.response?.data?.message);
                }
            }
        )
    }
})

export default productSlice.reducer;