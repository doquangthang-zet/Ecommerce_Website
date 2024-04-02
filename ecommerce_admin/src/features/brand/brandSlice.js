import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import brandService from "./brandService";

const initialState = {
    brands: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

//Get all brand
export const getBrands = createAsyncThunk("brand", async(thunkAPI) => {
    try {
        return await brandService.getBrands();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

// Create new brand
export const createBrand = createAsyncThunk(
    "brand/createBrand",
    async (brandData, thunkAPI) => {
      try {
        return await brandService.createBrand(brandData);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);

//Get one brand
export const getOneBrand = createAsyncThunk("brand/getOneBrand", async(id, thunkAPI) => {
    try {
        return await brandService.getOneBrand(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

// Update brand
export const updateBrand = createAsyncThunk(
    "brand/updateBrand",
    async (brand, thunkAPI) => {
      try {
        return await brandService.updateBrand(brand);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);

// Delete brand
export const deleteBrand = createAsyncThunk(
    "brand/deleteBrand",
    async (id, thunkAPI) => {
      try {
        return await brandService.deleteBrand(id);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);

export const resetState = createAction("Reset_all");

export const brandSlice = createSlice({
    name: "brand",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(
            getBrands.pending,
            (state) => {state.isLoading = true;}
        ).addCase(
            getBrands.fulfilled,
            (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.brands = action.payload;
            }
        ).addCase(
            getBrands.rejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }
        ).addCase(
            createBrand.pending, (state) => {
                state.isLoading = true;
            }
        )
        .addCase(
            createBrand.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdBrand = action.payload;
            }
        )
        .addCase(
            createBrand.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }
        ).addCase(
            getOneBrand.pending,
            (state) => {state.isLoading = true;}
        ).addCase(
            getOneBrand.fulfilled,
            (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.brandTitle = action.payload.title;
            }
        ).addCase(
            getOneBrand.rejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }
        ).addCase(
            updateBrand.pending,
            (state) => {state.isLoading = true;}
        ).addCase(
            updateBrand.fulfilled,
            (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedBrand = action.payload;
            }
        ).addCase(
            updateBrand.rejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }
        ).addCase(
            deleteBrand.pending,
            (state) => {state.isLoading = true;}
        ).addCase(
            deleteBrand.fulfilled,
            (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedBrand = action.payload;
            }
        ).addCase(
            deleteBrand.rejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }
        ).addCase(resetState, () => initialState);
    },
});

export default brandSlice.reducer;