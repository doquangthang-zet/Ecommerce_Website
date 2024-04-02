import axios from "axios";
import {baseUrl} from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

// Get all products of the web
const getProducts = async () => {
    const response = await axios.get(`${baseUrl}product`);
    
    return response.data;
};

//Create product
const createProduct = async (product) => {
    const response = await axios.post(`${baseUrl}product/`, product, config);
  
    return response.data;
};

// Get one product of the web
const getOneProduct = async (id) => {
    const response = await axios.get(`${baseUrl}product/${id}`, config);

    return response.data;
};

//Update product
const updateProduct = async (product) => {
    const response = await axios.put(`${baseUrl}product/${product.id}`, product.data, config);
  
    return response.data;
};

//Delete product
const deleteProduct = async (id) => {
    const response = await axios.delete(`${baseUrl}product/${id}`, config);
  
    return response.data;
};

const productService = {
    getProducts,
    createProduct,
    getOneProduct,
    updateProduct,
    deleteProduct,
};

export default productService;