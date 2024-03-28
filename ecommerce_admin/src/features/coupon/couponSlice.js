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
        ).addCase(resetState, () => initialState);
    },
});

export default couponSlice.reducer;