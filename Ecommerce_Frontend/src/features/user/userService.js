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
    const response  = await axios.post(`${baseUrl}user/login`, userData);

    return response.data;
}

//reset
const resetPassword = async (userData) => {
    const response  = await axios.post(`${baseUrl}user/resetPassword/${userData.token}`, {email: userData.email, password: userData.password});

    return response.data;
}

//Get wishlist
const getUserWishlist = async() => {
    const response = await axios.get(`${baseUrl}user/wishlist`, config);

    return response.data;
}
export const userService = {
    register,
    login,
    getUserWishlist,
}