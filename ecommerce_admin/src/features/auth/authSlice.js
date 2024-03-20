import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
})

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
        );
    },
});

export default authSlice.reducer;