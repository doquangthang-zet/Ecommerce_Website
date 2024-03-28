import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import bCateService from "./bCategoryService";

const userFromLocalstorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const initialState = {
    bCategories: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

//Get all bCategories
export const getbCategories = createAsyncThunk("bCategory", async(thunkAPI) => {
    try {
        return await bCateService.getBCategories();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

// Create new blgo cate
export const createBCate = createAsyncThunk(
    "bCategory/createBlogCate",
    async (bCateData, thunkAPI) => {
      try {
        return await bCateService.createBlogCate(bCateData);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);

export const resetState = createAction("Reset_all");

export const bCategorySlice = createSlice({
    name: "bCategory",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(
            getbCategories.pending,
            (state) => {state.isLoading = true;}
        ).addCase(
            getbCategories.fulfilled,
            (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.bCategories = action.payload;
            }
        ).addCase(
            getbCategories.rejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }
        ).addCase(
            createBCate.pending, (state) => {
                state.isLoading = true;
            }
        )
        .addCase(
            createBCate.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdBCategory = action.payload;
            }
        )
        .addCase(
            createBCate.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }
        ).addCase(resetState, () => initialState);
    },
});

export default bCategorySlice.reducer;