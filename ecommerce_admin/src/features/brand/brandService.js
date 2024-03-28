import axios from "axios";
import {baseUrl} from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

// Get all brands of the web
const getBrands = async () => {
    const response = await axios.get(`${baseUrl}brand`);

    return response.data;
};

//Create product
const createBrand = async (brand) => {
    const response = await axios.post(`${baseUrl}brand/`, brand, config);
  
    return response.data;
};

const brandService = {
    getBrands,
    createBrand,
};

export default brandService;