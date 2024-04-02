import axios from "axios";
import {baseUrl} from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

// Get all category of the web
const getPCategories = async () => {
    const response = await axios.get(`${baseUrl}productCategory`);

    return response.data;
};

//Create product category
const createProductCate = async (cate) => {
    const response = await axios.post(`${baseUrl}productCategory/`, cate, config);
  
    return response.data;
};

// Get one cate of the web
const getOnePCate = async (id) => {
    const response = await axios.get(`${baseUrl}productCategory/${id}`, config);

    return response.data;
};

//Update cate
const updatePCate = async (cate) => {
    const response = await axios.put(`${baseUrl}productCategory/${cate.id}`, cate.data, config);
  
    return response.data;
};

//Delete cate
const deletePCate = async (id) => {
    const response = await axios.delete(`${baseUrl}productCategory/${id}`, config);
  
    return response.data;
};

const categoryService = {
    getPCategories,
    createProductCate,
    getOnePCate,
    updatePCate,
    deletePCate,
};

export default categoryService;