import React from 'react'
import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { userService } from './userService';
import { toast } from 'react-toastify';
import {loadStripe} from '@stripe/stripe-js';

const userFromLocalstorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

//Register
export const userRegister = createAsyncThunk("user/register", async (userData, thunkAPI) => {
    try {
        return await userService.register(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

//Login
export const userLogin = createAsyncThunk("user/login", async (userData, thunkAPI) => {
    try {
        return await userService.login(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

//get user wishlist
export const getWishlist = createAsyncThunk("user/wishlist", async (thunkAPI) => {
    try {
        return await userService.getUserWishlist();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

//create user cart
export const addToCart = createAsyncThunk("user/cart/add", async (cartData, thunkAPI) => {
    try {
        return await userService.addToCart(cartData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

//get cart
export const getUserCart = createAsyncThunk("user/cart/get", async (thunkAPI) => {
    try {
        return await userService.getCart();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

//rempve product cart
export const deleteProdCart = createAsyncThunk("user/cart/delete", async (id, thunkAPI) => {
    try {
        return await userService.removeCardProd(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

//update product cart
export const updateProdCartQuantity = createAsyncThunk("user/cart/updateQuantity", async (quantityData, thunkAPI) => {
    try {
        return await userService.updateQuantityFromCart(quantityData.id, quantityData.newQuantity);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

// Create order
export const createOrder = createAsyncThunk("user/order/createOrder", async (orderData, thunkAPI) => {
    try {
        return await userService.createOrder(orderData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

// Make payment for cart
export const makePayment = createAsyncThunk("user/order/payment", async (cartItems, thunkAPI) => {
    try {
        const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
        const response = await userService.makePayment(cartItems);
        
        const result = await stripe.redirectToCheckout({
            sessionId: response.id,
        });
        
        return result;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

//Get user orders
export const getUserOrders = createAsyncThunk("user/order/getOrders", async (thunkAPI) => {
    try {
        return await userService.getUserOrders();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

// Update user profile
export const updateUserProfile = createAsyncThunk("user/updateProfile", async (userData, thunkAPI) => {
    try {
        return await userService.updateProfile(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

// Forgot password
export const forgotPasswordToken = createAsyncThunk("user/forgotPassword", async (email, thunkAPI) => {
    try {
        return await userService.forgotPassword(email);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

// Reset password
export const resetPassword = createAsyncThunk("user/resetPassword", async (resetData, thunkAPI) => {
    try {
        return await userService.resetPassword(resetData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

// Delete user cart
export const deleteCart = createAsyncThunk("user/deleteCart", async (thunkAPI) => {
    try {
        return await userService.emptyCart();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const initialState = {
    currentUser: userFromLocalstorage,
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: "",
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            userRegister.pending, (state) => {
                state.isLoading = true;
            }
        ).addCase(
            userRegister.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdUser = action.payload;
                if(state.isSuccess) {
                    toast.success("User created successfully!");
                }
            }
        ).addCase(
            userRegister.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.error;
                if(state.isError) {
                    toast.error(action?.payload?.response?.data?.message);
                }
            }
        ).addCase(
            userLogin.pending, (state) => {
                state.isLoading = true;
            }
        ).addCase(
            userLogin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.currentUser = action.payload;
                if(state.isSuccess) {
                    localStorage.setItem("user", JSON.stringify(action.payload));
                    toast.success("User logged in successfully!");
                }
            }
        ).addCase(
            userLogin.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.error;
                if(state.isError) {
                    toast.error(action?.payload?.response?.data?.message);
                }
            }
        ).addCase(
            getWishlist.pending, (state) => {
                state.isLoading = true;
            }
        ).addCase(
            getWishlist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.wishlist = action.payload;
            }
        ).addCase(
            getWishlist.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.error;
                if(state.isError) {
                    toast.error(action?.payload?.response?.data?.message);
                }
            }
        ).addCase(
            addToCart.pending, (state) => {
                state.isLoading = true;
            }
        ).addCase(
            addToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.cart = action.payload;
                if(state.isSuccess) {
                    toast.success("Product added!");
                }
                state.message = "success";
            }
        ).addCase(
            addToCart.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.error;
                if(state.isError) {
                    toast.error(action?.payload?.response?.data?.message);
                }
            }
        ).addCase(
            getUserCart.pending, (state) => {
                state.isLoading = true;
            }
        ).addCase(
            getUserCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.userCart = action.payload;
                state.message = "success";
            }
        ).addCase(
            getUserCart.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.error;
                if(state.isError) {
                    toast.error(action?.payload?.response?.data?.message);
                }
            }
        ).addCase(
            deleteProdCart.pending, (state) => {
                state.isLoading = true;
            }
        ).addCase(
            deleteProdCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedCart = action.payload;
                if(state.isSuccess) {
                    toast.success("Product deleted successfully!");
                }
                state.message = "success";
            }
        ).addCase(
            deleteProdCart.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.error;
                if(state.isError) {
                    toast.error(action?.payload?.response?.data?.message);
                }
            }
        ).addCase(
            updateProdCartQuantity.pending, (state) => {
                state.isLoading = true;
            }
        ).addCase(
            updateProdCartQuantity.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedCart = action.payload;
                if(state.isSuccess) {
                    toast.success("Product updated successfully!");
                }
                state.message = "success";
            }
        ).addCase(
            updateProdCartQuantity.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.error;
                if(state.isError) {
                    toast.error(action?.payload?.response?.data?.message);
                }
            }
        ).addCase(
            createOrder.pending, (state) => {
                state.isLoading = true;
            }
        ).addCase(
            createOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdOrder = action.payload;
                if(state.isSuccess) {
                    toast.success("Order created successfully!");
                }
                state.message = "success";
            }
        ).addCase(
            createOrder.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.error;
                if(state.isError) {
                    toast.error(action?.payload?.response?.data?.message);
                }
            }
        ).addCase(
            makePayment.pending, (state) => {
                state.isLoading = true;
            }
        ).addCase(
            makePayment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.payment = action.payload;
                if(state.isSuccess) {
                    toast.success("Payment success!");
                }
                state.message = "success";
            }
        ).addCase(
            makePayment.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.error;
                if(state.isError) {
                    toast.error(action?.payload?.response?.data?.message);
                }
            }
        ).addCase(
            getUserOrders.pending, (state) => {
                state.isLoading = true;
            }
        ).addCase(
            getUserOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.orders = action.payload;
                state.message = "success";
            }
        ).addCase(
            getUserOrders.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.error;
                if(state.isError) {
                    toast.error(action?.payload?.response?.data?.message);
                }
            }
        ).addCase(
            updateUserProfile.pending, (state) => {
                state.isLoading = true;
            }
        ).addCase(
            updateUserProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedUser = action.payload;
                state.currentUser = action.payload;
                if(state.isSuccess) {
                    localStorage.setItem("user", JSON.stringify(action.payload));
                    toast.success("Profile updated successfully!");
                }
                state.message = "success";
            }
        ).addCase(
            updateUserProfile.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.error;
                if(state.isError) {
                    toast.error(action?.payload?.response?.data?.message);
                }
            }
        ).addCase(
            forgotPasswordToken.pending, (state, action) => {
                state.isLoading = true;
            }
        ).addCase(forgotPasswordToken.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = action.payload;
            if(state.isSuccess) {
                toast.success("Password reset link sent to your email!");
            }
        }).addCase(forgotPasswordToken.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isError) {
                toast.error(action?.payload?.response?.data?.message);
            }
        }).addCase(
            resetPassword.pending, (state) => {
                state.isLoading = true;
            }
        ).addCase(resetPassword.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = action.payload;
            if(state.isSuccess) {
                toast.success("Password reset successfully!");
            }
        }).addCase(resetPassword.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isError) {
                toast.error(action?.payload?.response?.data?.message);
            }
        }).addCase(
            deleteCart.pending, (state) => {
                state.isLoading = true;
            }
        ).addCase(
            deleteCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedCart = action.payload;
                if(state.isSuccess) {
                    toast.success("Cart deleted successfully!");
                }
                state.message = "success";
            }
        ).addCase(
            deleteCart.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.error;
                if(state.isError) {
                    toast.error(action?.payload?.response?.data?.message);
                }
            }
        )
    }
})

export default userSlice.reducer;