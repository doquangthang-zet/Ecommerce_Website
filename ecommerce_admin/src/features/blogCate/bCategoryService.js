import axios from "axios";
import {baseUrl} from "../../utils/baseUrl";
import api from "../../utils/axiosconfig";

// Get all blog cates of the web
const getBCategories = async () => {
    const response = await axios.get(`${baseUrl}blogCategory`);

    return response.data;
};

//Create blog category
const createBlogCate = async (bCate) => {
    const response = await api.post("blogCategory/", bCate);
  
    return response.data;
};

// Get one blogCate of the web
const getOneBlogCate = async (id) => {
    const response = await api.get(`blogCategory/${id}`);

    return response.data;
};

//Update blogCate
const updateBlogCate = async (blogCate) => {
    const response = await api.put(`blogCategory/${blogCate.id}`, blogCate.data);
  
    return response.data;
};

//Delete blogCate
const deleteBlogCate = async (id) => {
    const response = await api.delete(`blogCategory/${id}`);
  
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