import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import authService from "./authService";

const userFromLocalstorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const initialState = {
    user: userFromLocalstorage,
    orders: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

//Login using admin email
export const login = createAsyncThunk("user/adminLogin", async(user, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

//Get all orders
export const getOrder = createAsyncThunk("user/getOrder", async(thunkAPI) => {
    try {
        return await authService.getOrders();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

//Get monthly orders
export const getMonthlyOrderIncome = createAsyncThunk("user/getMonthlyOrder", async(thunkAPI) => {
    try {
        return await authService.getMonthlyOrders();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

//Get year;y orders
export const getYearlyOrderIncome = createAsyncThunk("user/getYearlyOrder", async(thunkAPI) => {
    try {
        return await authService.getYearlyOrdersCount();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

//Get all orders
export const getAllOrders = createAsyncThunk("user/getAllOrder", async(thunkAPI) => {
    try {
        return await authService.getAllOrders();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

//Get single order
export const getSingleOrder = createAsyncThunk("user/getSingleOrder", async(id, thunkAPI) => {
    try {
        return await authService.getSingleOrder(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

//Update order status
export const updateOrder = createAsyncThunk("user/updateOrderStatus", async(orderData, thunkAPI) => {
    try {
        return await authService.updateOrderStatus(orderData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const resetState = createAction("Reset_all");

export const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(
            login.pending,
            (state) => {state.isLoading = true;}
        ).addCase(
            login.fulfilled,
            (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.message = "success";
            }
        ).addCase(
            login.rejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.user = null;
                state.message = action.error;
            }
        ).addCase(
            getOrder.pending,
            (state) => {state.isLoading = true;}
        ).addCase(
            getOrder.fulfilled, 
            (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.orders = action.payload;
                state.message = "success";
            }
        ).addCase(
            getOrder.rejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }
        ).addCase(
            getMonthlyOrderIncome.pending,
            (state) => {state.isLoading = true;}
        ).addCase(
            getMonthlyOrderIncome.fulfilled, 
            (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.monthlyOrders = action.payload;
                state.message = "success";
            }
        ).addCase(
            getMonthlyOrderIncome.rejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }
        ).addCase(
            getYearlyOrderIncome.pending,
            (state) => {state.isLoading = true;}
        ).addCase(
            getYearlyOrderIncome.fulfilled, 
            (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.yearlyOrders = action.payload;
                state.message = "success";
            }
        ).addCase(
            getYearlyOrderIncome.rejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }
        ).addCase(
            getAllOrders.pending,
            (state) => {state.isLoading = true;}
        ).addCase(
            getAllOrders.fulfilled, 
            (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.orders = action.payload;
                state.message = "success";
            }
        ).addCase(
            getAllOrders.rejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }
        ).addCase(
            getSingleOrder.pending,
            (state) => {state.isLoading = true;}
        ).addCase(
            getSingleOrder.fulfilled, 
            (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.singleOrder = action.payload;
                state.message = "success";
            }
        ).addCase(
            getSingleOrder.rejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }
        ).addCase(
            updateOrder.pending,
            (state) => {state.isLoading = true;}
        ).addCase(
            updateOrder.fulfilled, 
            (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = "success";
            }
        ).addCase(
            updateOrder.rejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }
        )
        .addCase(resetState, () => initialState);
    },
});

export default authSlice.reducer;