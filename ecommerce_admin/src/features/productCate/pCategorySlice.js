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

//Get one category
export const getOneCategory = createAsyncThunk("category/getOneCate", async(id, thunkAPI) => {
    try {
        return await categoryService.getOnePCate(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

// Update category
export const updateCategory = createAsyncThunk(
    "category/updateCategory",
    async (category, thunkAPI) => {
      try {
        return await categoryService.updatePCate(category);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);

// Delete category
export const deleteCategory = createAsyncThunk(
    "category/deleteCategory",
    async (id, thunkAPI) => {
      try {
        return await categoryService.deletePCate(id);
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
        ).addCase(
            getOneCategory.pending,
            (state) => {state.isLoading = true;}
        ).addCase(
            getOneCategory.fulfilled,
            (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.categoryTitle = action.payload.title;
            }
        ).addCase(
            getOneCategory.rejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }
        ).addCase(
            updateCategory.pending,
            (state) => {state.isLoading = true;}
        ).addCase(
            updateCategory.fulfilled,
            (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedCategory = action.payload;
            }
        ).addCase(
            updateCategory.rejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }
        ).addCase(
            deleteCategory.pending,
            (state) => {state.isLoading = true;}
        ).addCase(
            deleteCategory.fulfilled,
            (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedCategory = action.payload;
            }
        ).addCase(
            deleteCategory.rejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }
        ).addCase(resetState, () => initialState);
    },
});

export default categorySlice.reducer;