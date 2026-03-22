import axios from "axios";
import {baseUrl} from "../../utils/baseUrl";
import api from "../../utils/axiosconfig";

// Get all blogs of the web
const getBlogs = async () => {
    const response = await axios.get(`${baseUrl}blog`);

    return response.data;
};

//Create blog
const createBlog = async (blog) => {
    const response = await api.post("blog/", blog);
  
    return response.data;
};

// Get one blog of the web
const getOneBlog = async (id) => {
    const response = await api.get(`blog/${id}`);

    return response.data;
};

//Update blog
const updateBlog = async (blog) => {
    const response = await api.put(`blog/${blog.id}`, blog.data);

    return response.data;
};

//Delete blog
const deleteBlog = async (id) => {
    const response = await api.delete(`blog/${id}`);

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