import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import categoryService from "./pCategoryService";

const initialState = {
    categories: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

//Get all cates
export const getCategories = createAsyncThunk("category", async(thunkAPI) => {
    try {
        return await categoryService.getPCategories();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

// Create new product category
export const createProductCate = createAsyncThunk(
    "category/createProductCate",
    async (categoryData, thunkAPI) => {
      try {
        return await categoryService.createProductCate(categoryData);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);

export const resetState = createAction("Reset_all");

export const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(
            getCategories.pending,
            (state) => {state.isLoading = true;}
        ).addCase(
            getCategories.fulfilled,
            (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.categories = action.payload;
            }
        ).addCase(
            getCategories.rejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }
        ).addCase(
            createProductCate.pending, (state) => {
                state.isLoading = true;
            }
        )
        .addCase(
            createProductCate.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdProductCategory = action.payload;
            }
        )
        .addCase(
            createProductCate.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }
        ).addCase(resetState, () => initialState);
    },
});

export default categorySlice.reducer;