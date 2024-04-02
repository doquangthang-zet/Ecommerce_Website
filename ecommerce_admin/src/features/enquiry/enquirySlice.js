import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
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

//Get one enquiry
export const getOneEnquiry = createAsyncThunk("enquiry/getOneEnquiry", async(id, thunkAPI) => {
    try {
        return await enquiryService.getOneEnquiry(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

// Update enquiry
export const updateEnquiry = createAsyncThunk(
    "enquiry/updateEnquiry",
    async (enquiry, thunkAPI) => {
      try {
        return await enquiryService.updateEnquiry(enquiry);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);

// Delete enquiry
export const deleteEnquiry = createAsyncThunk(
    "enquiry/deleteEnquiry",
    async (id, thunkAPI) => {
      try {
        return await enquiryService.deleteEnquiry(id);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);

export const resetState = createAction("Reset_all");

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
        ).addCase(
            getOneEnquiry.pending,
            (state) => {state.isLoading = true;}
        ).addCase(
            getOneEnquiry.fulfilled,
            (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.currentEnquiry = action.payload;
            }
        ).addCase(
            getOneEnquiry.rejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }
        ).addCase(
            updateEnquiry.pending,
            (state) => {state.isLoading = true;}
        ).addCase(
            updateEnquiry.fulfilled,
            (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedEnquiry = action.payload;
            }
        ).addCase(
            updateEnquiry.rejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }
        ).addCase(
            deleteEnquiry.pending,
            (state) => {state.isLoading = true;}
        ).addCase(
            deleteEnquiry.fulfilled,
            (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedEnquiry = action.payload;
            }
        ).addCase(
            deleteEnquiry.rejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }
        ).addCase(resetState, () => initialState);
    },
});

export default enquirySlice.reducer;