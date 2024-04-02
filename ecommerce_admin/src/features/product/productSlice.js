import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import productService from "./productService";

const initialState = {
    products: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
    currentProduct: {},
};

//Get all products
export const getProducts = createAsyncThunk("product", async(thunkAPI) => {
    try {
        return await productService.getProducts();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

// Create new product
export const createProducts = createAsyncThunk(
    "product/createProducts",
    async (productData, thunkAPI) => {
      try {
        return await productService.createProduct(productData);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);

//Get one product
export const getOneProduct = createAsyncThunk("product/getOneProduct", async(id, thunkAPI) => {
    try {
        return await productService.getOneProduct(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

// Update product
export const updateProduct = createAsyncThunk(
    "product/updateProduct",
    async (product, thunkAPI) => {
      try {
        return await productService.updateProduct(product);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);

// Delete product
export const deleteProduct = createAsyncThunk(
    "product/deleteProduct",
    async (id, thunkAPI) => {
      try {
        return await productService.deleteProduct(id);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);

export const resetState = createAction("Reset_all");

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(
            getProducts.pending,
            (state) => {state.isLoading = true;}
        ).addCase(
            getProducts.fulfilled,
            (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.products = action.payload;
            }
        ).addCase(
            getProducts.rejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }
        ).addCase(
            createProducts.pending, (state) => {
                state.isLoading = true;
            }
        )
        .addCase(
            createProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdProduct = action.payload;
            }
        )
        .addCase(
            createProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }
        ).addCase(
            getOneProduct.pending,
            (state) => {state.isLoading = true;}
        ).addCase(
            getOneProduct.fulfilled,
            (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.currentProduct = action.payload;
            }
        ).addCase(
            getOneProduct.rejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }
        ).addCase(
            updateProduct.pending,
            (state) => {state.isLoading = true;}
        ).addCase(
            updateProduct.fulfilled,
            (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedProduct = action.payload;
            }
        ).addCase(
            updateProduct.rejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }
        ).addCase(
            deleteProduct.pending,
            (state) => {state.isLoading = true;}
        ).addCase(
            deleteProduct.fulfilled,
            (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedProduct = action.payload;
            }
        ).addCase(
            deleteProduct.rejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }
        ).addCase(resetState, () => initialState);
    },
});

export default productSlice.reducer;