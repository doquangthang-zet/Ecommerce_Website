import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customerService from "./customerService";

const userFromLocalstorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const initialState = {
    customers: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

//Login using admin email
export const getUsers = createAsyncThunk("customer/all", async(thunkAPI) => {
    try {
        return await customerService.getUsers();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(
            getUsers.pending,
            (state) => {state.isLoading = true;}
        ).addCase(
            getUsers.fulfilled,
            (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.customers = action.payload;
            }
        ).addCase(
            getUsers.rejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }
        );
    },
});

export default customerSlice.reducer;