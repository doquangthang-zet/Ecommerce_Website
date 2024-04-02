import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import blogService from "./blogService";

const initialState = {
    blogs: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

//Get all blogs
export const getBlogs = createAsyncThunk("blog", async(thunkAPI) => {
    try {
        return await blogService.getBlogs();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

// Create new blog
export const createBlog = createAsyncThunk(
    "blog/createBlog",
    async (blogData, thunkAPI) => {
      try {
        return await blogService.createBlog(blogData);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);

//Get one blog
export const getOneBlog = createAsyncThunk("blog/getOneBlog", async(id, thunkAPI) => {
    try {
        return await blogService.getOneBlog(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

// Update blog
export const updateBlog = createAsyncThunk(
    "blog/updateBlog",
    async (blog, thunkAPI) => {
      try {
        return await blogService.updateBlog(blog);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);

// Delete blog
export const deleteBlog = createAsyncThunk(
    "blog/deleteBlog",
    async (id, thunkAPI) => {
      try {
        return await blogService.deleteBlog(id);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);

export const resetState = createAction("Reset_all");

export const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(
            getBlogs.pending,
            (state) => {state.isLoading = true;}
        ).addCase(
            getBlogs.fulfilled,
            (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.blogs = action.payload;
            }
        ).addCase(
            getBlogs.rejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }
        ).addCase(
            createBlog.pending, (state) => {
                state.isLoading = true;
            }
        )
        .addCase(
            createBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdBlog = action.payload;
            }
        )
        .addCase(
            createBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }
        ).addCase(
            getOneBlog.pending,
            (state) => {state.isLoading = true;}
        ).addCase(
            getOneBlog.fulfilled,
            (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.currentBlog = action.payload;
            }
        ).addCase(
            getOneBlog.rejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }
        ).addCase(
            updateBlog.pending,
            (state) => {state.isLoading = true;}
        ).addCase(
            updateBlog.fulfilled,
            (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedBlog = action.payload;
            }
        ).addCase(
            updateBlog.rejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }
        ).addCase(
            deleteBlog.pending,
            (state) => {state.isLoading = true;}
        ).addCase(
            deleteBlog.fulfilled,
            (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedBlog = action.payload;
            }
        ).addCase(
            deleteBlog.rejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }
        ).addCase(resetState, () => initialState);
    },
});

export default blogSlice.reducer;