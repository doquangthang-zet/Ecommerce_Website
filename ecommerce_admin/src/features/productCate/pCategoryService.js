import axios from "axios";
import {baseUrl} from "../../utils/baseUrl";
import api from "../../utils/axiosconfig";

// Get all category of the web
const getPCategories = async () => {
    const response = await axios.get(`${baseUrl}productCategory`);

    return response.data;
};

//Create product category
const createProductCate = async (cate) => {
    const response = await api.post("productCategory/", cate);
  
    return response.data;
};

// Get one cate of the web
const getOnePCate = async (id) => {
    const response = await api.get(`productCategory/${id}`);

    return response.data;
};

//Update cate
const updatePCate = async (cate) => {
    const response = await api.put(`productCategory/${cate.id}`, cate.data);
  
    return response.data;
};

//Delete cate
const deletePCate = async (id) => {
    const response = await api.delete(`productCategory/${id}`);
  
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