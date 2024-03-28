import axios from "axios";
import {baseUrl} from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

// Get all users of the web
const getProducts = async () => {
    const response = await axios.get(`${baseUrl}product`);
    
    return response.data;
};

//Create product
const createProduct = async (product) => {
    const response = await axios.post(`${baseUrl}product/`, product, config);
  
    return response.data;
};

const productService = {
    getProducts,
    createProduct,
};

export default productService;