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

//Get one color
export const getOneColor = createAsyncThunk("color/getOneColor", async(id, thunkAPI) => {
    try {
        return await colorService.getOneColor(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

// Update color
export const updateColor = createAsyncThunk(
    "color/updateColor",
    async (color, thunkAPI) => {
      try {
        return await colorService.updateColor(color);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);

// Delete color
export const deleteColor = createAsyncThunk(
    "color/deleteColor",
    async (id, thunkAPI) => {
      try {
        return await colorService.deleteColor(id);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);

export const resetState = createAction("Reset_all");

export const colorSlice = createSlice({
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
        ).addCase(
            getOneColor.pending,
            (state) => {state.isLoading = true;}
        ).addCase(
            getOneColor.fulfilled,
            (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.colorTitle = action.payload.title;
            }
        ).addCase(
            getOneColor.rejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }
        ).addCase(
            updateColor.pending,
            (state) => {state.isLoading = true;}
        ).addCase(
            updateColor.fulfilled,
            (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedColor = action.payload;
            }
        ).addCase(
            updateColor.rejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }
        ).addCase(
            deleteColor.pending,
            (state) => {state.isLoading = true;}
        ).addCase(
            deleteColor.fulfilled,
            (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedColor = action.payload;
            }
        ).addCase(
            deleteColor.rejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }
        ).addCase(resetState, () => initialState);
    },
});

export default colorSlice.reducer;