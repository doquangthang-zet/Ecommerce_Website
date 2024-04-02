import axios from "axios";
import {baseUrl} from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

// Get all blogs of the web
const getBlogs = async () => {
    const response = await axios.get(`${baseUrl}blog`);

    return response.data;
};

//Create blog
const createBlog = async (blog) => {
    const response = await axios.post(`${baseUrl}blog/`, blog, config);
  
    return response.data;
};

// Get one blog of the web
const getOneBlog = async (id) => {
    const response = await axios.get(`${baseUrl}blog/${id}`, config);

    return response.data;
};

//Update blog
const updateBlog = async (blog) => {
    const response = await axios.put(`${baseUrl}blog/${blog.id}`, blog.data, config);
  
    return response.data;
};

//Delete blog
const deleteBlog = async (id) => {
    const response = await axios.delete(`${baseUrl}blog/${id}`, config);
  
    return response.data;
};

const blogService = {
    getBlogs,
    createBlog,
    getOneBlog,
    updateBlog,
    deleteBlog,
};

export default blogService;