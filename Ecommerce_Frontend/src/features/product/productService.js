import React from 'react';
import axios from "axios";
import { baseUrl } from '../../utils/baseUrl';
import { config } from '../../utils/axiosconfig';

//Get all product
const getProducts = async () => {
    const response = await axios.get(`${baseUrl}product`);

    if(response.data) {
        return response.data;
    }
}

//Add product to wishlist
const addToWishlist = async (proId) => {
    const response = await axios.put(`${baseUrl}product/addToWishlist`, {prodId: proId}, config);

    if(response.data) {
        return response.data;
    }
}

export const productService = {
    getProducts,
    addToWishlist,
}