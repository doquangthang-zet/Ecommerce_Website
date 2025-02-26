import React from 'react';
import axios from "axios";
import { baseUrl } from '../../utils/baseUrl';
import { config } from '../../utils/axiosconfig';

//register new user
const register = async (userData) => {
    const response = await axios.post(`${baseUrl}user/register`, userData);

    return response.data;
};

//login
const login = async (userData) => {
    const response  = await axios.post(`${baseUrl}user/login`, userData);

    return response.data;
}

//forgot pass
const forgotPassword = async (userData) => {
    const response  = await axios.post(`${baseUrl}user/forgotPasswordToken`, userData);

    return response.data;
}

//reset
const resetPassword = async (userData) => {
    const response  = await axios.put(`${baseUrl}user/resetPassword/${userData.token}`, {password: userData.password});

    return response.data;
}

//Get wishlist
const getUserWishlist = async() => {
    const response = await axios.get(`${baseUrl}user/wishlist`, config);

    return response.data;
}

//Add to cart
const addToCart = async(cartData) => {
    const response = await axios.post(`${baseUrl}user/cart`, cartData, config);

    return response.data;
}

//Get cart
const getCart = async() => {
    const response = await axios.get(`${baseUrl}user/cart`, config);

    return response.data;
}

//Remove product from cart
const removeCardProd = async(id) => {
    const response = await axios.delete(`${baseUrl}user/deleteProdCart/${id}`, config);

    return response.data;
}

// Update product quantity from cart
const updateQuantityFromCart = async(id, newQuantity) => {
    const response = await axios.put(`${baseUrl}user/cart/updateQuantity/${id}`, {newQuantity: newQuantity}, config);

    return response.data;
}

// Create order
 const createOrder = async(orderData) => {
    const response = await axios.post(`${baseUrl}user/cart/createOrder`, orderData, config);

    return response.data;
}

// Make payment for user cart
const makePayment = async (cartItems) => {
    const response = await axios.post(`${baseUrl}user/cart/payment`, {cartItems: cartItems}, config);

    return response.data;
}

// GET user order
const getUserOrders = async (orderData) => {
    const response = await axios.get(`${baseUrl}user/myOrder`, config);

    return response.data;
}

// Update user profile
 const updateProfile = async (userData) => {
    const response = await axios.put(`${baseUrl}user/update`, userData, config);

    return response.data;
}

// Empty user cart
 const emptyCart = async () => {
    const response = await axios.delete(`${baseUrl}user/cart`, config);

    return response.data;
}

export const userService = {
    register,
    login,
    getUserWishlist,
    addToCart,
    getCart,
    removeCardProd,
    updateQuantityFromCart,
    makePayment,
    createOrder,
    getUserOrders,
    updateProfile,
    forgotPassword,
    resetPassword,
    emptyCart,
}