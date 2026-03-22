import axios from "axios";
import {baseUrl} from "../../utils/baseUrl";
import api from "../../utils/axiosconfig";

// Get all products of the web
const getProducts = async () => {
    const response = await axios.get(`${baseUrl}product`);
    
    return response.data;
};

//Create product
const createProduct = async (product) => {
    const response = await api.post("product/", product);
  
    return response.data;
};

// Get one product of the web
const getOneProduct = async (id) => {
    const response = await api.get(`product/${id}`);

    return response.data;
};

//Update product
const updateProduct = async (product) => {
    const response = await api.put(`product/${product.id}`, product.data);
  
    return response.data;
};

//Delete product
const deleteProduct = async (id) => {
    const response = await api.delete(`product/${id}`);
  
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