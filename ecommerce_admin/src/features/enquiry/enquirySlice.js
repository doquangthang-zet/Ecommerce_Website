import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import enquiryService from "./enquiryService";

const userFromLocalstorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const initialState = {
    enquiries: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

//Get all enquiries
export const getEnquiries = createAsyncThunk("enquiry", async(thunkAPI) => {
    try {
        return await enquiryService.getEnquiries();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const enquirySlice = createSlice({
    name: "enquiry",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(
            getEnquiries.pending,
            (state) => {state.isLoading = true;}
        ).addCase(
            getEnquiries.fulfilled,
            (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.enquiries = action.payload;
            }
        ).addCase(
            getEnquiries.rejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }
        );
    },
});

export default enquirySlice.reducer;