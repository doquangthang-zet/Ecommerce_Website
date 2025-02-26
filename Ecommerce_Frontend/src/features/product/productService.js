import axios from "axios";
import { baseUrl } from '../../utils/baseUrl';
import { config } from '../../utils/axiosconfig';

//Get all product
const getProducts = async (filter) => {
    const response = await axios.get(`${baseUrl}product?${filter?.brand ? `brand=${filter?.brand}&` : ""}${filter?.category ? `category=${filter?.category}&` : ""}${filter?.tags ? `tags=${filter?.tags}&` : ""}${filter?.maxPrice ? `price[lte]=${filter?.maxPrice}&` : ""}${filter?.minPrice ? `price[gte]=${filter?.minPrice}&` : ""}${filter?.sort ? `sort=${filter?.sort}&` : ""}`);

    if(response.data) {
        return response.data;
    }
}

//Get one product
const getOneProduct = async (prodId) => {
    const response = await axios.get(`${baseUrl}product/${prodId}`);

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

// Rate the product
const rateProduct = async (data) => {
    const response = await axios.put(`${baseUrl}product/rating`, data, config);

    if(response.data) {
        return response.data;
    }
}

export const productService = {
    getProducts,
    getOneProduct,
    addToWishlist,
    rateProduct,
}