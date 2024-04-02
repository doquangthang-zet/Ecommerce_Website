import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import couponService from "./couponService";

const initialState = {
    coupons: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

//Get all coupons
export const getCoupon = createAsyncThunk("coupon", async(thunkAPI) => {
    try {
        return await couponService.getCoupons();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

// Create new coupon
export const createCoupon = createAsyncThunk(
    "coupon/createCoupon",
    async (couponData, thunkAPI) => {
      try {
        return await couponService.createCoupon(couponData);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);

//Get one coupon
export const getOneCoupon = createAsyncThunk("coupon/getOneCoupon", async(id, thunkAPI) => {
    try {
        return await couponService.getOneCoupon(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

// Update coupon
export const updateCoupon = createAsyncThunk(
    "coupon/updateCoupon",
    async (coupon, thunkAPI) => {
      try {
        return await couponService.updateCoupon(coupon);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);

// Delete coupon
export const deleteCoupon = createAsyncThunk(
    "coupon/deleteCoupon",
    async (id, thunkAPI) => {
      try {
        return await couponService.deleteCoupon(id);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);

export const resetState = createAction("Reset_all");

export const couponSlice = createSlice({
    name: "coupon",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(
            getCoupon.pending,
            (state) => {state.isLoading = true;}
        ).addCase(
            getCoupon.fulfilled,
            (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.coupons = action.payload;
            }
        ).addCase(
            getCoupon.rejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }
        ).addCase(
            createCoupon.pending, (state) => {
                state.isLoading = true;
            }
        )
        .addCase(
            createCoupon.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdCoupon = action.payload;
            }
        )
        .addCase(
            createCoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }
        ).addCase(
            getOneCoupon.pending,
            (state) => {state.isLoading = true;}
        ).addCase(
            getOneCoupon.fulfilled,
            (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.currentCoupon = action.payload;
            }
        ).addCase(
            getOneCoupon.rejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }
        ).addCase(
            updateCoupon.pending,
            (state) => {state.isLoading = true;}
        ).addCase(
            updateCoupon.fulfilled,
            (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedCoupon = action.payload;
            }
        ).addCase(
            updateCoupon.rejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }
        ).addCase(
            deleteCoupon.pending,
            (state) => {state.isLoading = true;}
        ).addCase(
            deleteCoupon.fulfilled,
            (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedCoupon = action.payload;
            }
        ).addCase(
            deleteCoupon.rejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }
        ).addCase(resetState, () => initialState);
    },
});

export default couponSlice.reducer;