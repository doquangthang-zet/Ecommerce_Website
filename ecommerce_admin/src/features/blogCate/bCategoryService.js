import axios from "axios";
import {baseUrl} from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

// Get all blog cates of the web
const getBCategories = async () => {
    const response = await axios.get(`${baseUrl}blogCategory`);

    return response.data;
};

//Create blog category
const createBlogCate = async (bCate) => {
    const response = await axios.post(`${baseUrl}blogCategory/`, bCate, config);
  
    return response.data;
};

// Get one blogCate of the web
const getOneBlogCate = async (id) => {
    const response = await axios.get(`${baseUrl}blogCategory/${id}`, config);

    return response.data;
};

//Update blogCate
const updateBlogCate = async (blogCate) => {
    const response = await axios.put(`${baseUrl}blogCategory/${blogCate.id}`, blogCate.data, config);
  
    return response.data;
};

//Delete blogCate
const deleteBlogCate = async (id) => {
    const response = await axios.delete(`${baseUrl}blogCategory/${id}`, config);
  
    return response.data;
};

const bCateService = {
    getBCategories,
    createBlogCate,
    getOneBlogCate,
    updateBlogCate,
    deleteBlogCate,
};

export default bCateService;