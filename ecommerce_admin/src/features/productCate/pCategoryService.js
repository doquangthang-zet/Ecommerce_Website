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

const categoryService = {
    getPCategories,
    createProductCate,
};

export default categoryService;