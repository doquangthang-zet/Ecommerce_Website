import axios from "axios";
import {baseUrl} from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

// Get all brands of the web
const getBrands = async () => {
    const response = await axios.get(`${baseUrl}brand`);

    return response.data;
};

//Create brand
const createBrand = async (brand) => {
    const response = await axios.post(`${baseUrl}brand/`, brand, config);
  
    return response.data;
};

// Get one brand of the web
const getOneBrand = async (id) => {
    const response = await axios.get(`${baseUrl}brand/${id}`, config);

    return response.data;
};

//Update brand
const updateBrand = async (brand) => {
    const response = await axios.put(`${baseUrl}brand/${brand.id}`, brand.data, config);
  
    return response.data;
};

//Delete brand
const deleteBrand = async (id) => {
    const response = await axios.delete(`${baseUrl}brand/${id}`, config);
  
    return response.data;
};

const brandService = {
    getBrands,
    createBrand,
    getOneBrand,
    updateBrand,
    deleteBrand,
};

export default brandService;