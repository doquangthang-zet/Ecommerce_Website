import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import colorService from "./colorService";

const initialState = {
    colors: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

//Get all colors
export const getColors = createAsyncThunk("color", async(thunkAPI) => {
    try {
        return await colorService.getColors();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

// Create new color
export const createColor = createAsyncThunk(
    "color/createColor",
    async (colorData, thunkAPI) => {
      try {
        return await colorService.createColor(colorData);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);

export const resetState = createAction("Reset_all");

export const brandSlice = createSlice({
    name: "color",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(
            getColors.pending,
            (state) => {state.isLoading = true;}
        ).addCase(
            getColors.fulfilled,
            (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.colors = action.payload;
            }
        ).addCase(
            getColors.rejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }
        ).addCase(
            createColor.pending, (state) => {
                state.isLoading = true;
            }
        )
        .addCase(
            createColor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdColor = action.payload;
            }
        )
        .addCase(
            createColor.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }
        ).addCase(resetState, () => initialState);
    },
});

export default brandSlice.reducer;