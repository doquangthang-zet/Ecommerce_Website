import axios from "axios";
import {baseUrl} from "../../utils/baseUrl";
import api from "../../utils/axiosconfig";

// Get all brands of the web
const getBrands = async () => {
    const response = await axios.get(`${baseUrl}brand`);

    return response.data;
};

//Create brand
const createBrand = async (brand) => {
    const response = await api.post("brand/", brand);
  
    return response.data;
};

// Get one brand of the web
const getOneBrand = async (id) => {
    const response = await api.get(`brand/${id}`);

    return response.data;
};

//Update brand
const updateBrand = async (brand) => {
    const response = await api.put(`brand/${brand.id}`, brand.data);
  
    return response.data;
};

//Delete brand
const deleteBrand = async (id) => {
    const response = await api.delete(`brand/${id}`);
  
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