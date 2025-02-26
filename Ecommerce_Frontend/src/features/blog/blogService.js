import axios from "axios";
import { baseUrl } from '../../utils/baseUrl';
import { config } from '../../utils/axiosconfig';

//Get all blog
const getBlogs = async (category) => {
    const response = await axios.get(`${baseUrl}blog?${category ? `category=${category}` : ''}`);

    if(response.data) {
        return response.data;
    }
}

//GET ONE BLOG
const getOneBlog = async (blogId) => {
    const response = await axios.get(`${baseUrl}blog/${blogId}`);

    if(response.data) {
        return response.data;
    }
}

export const blogService = {
    getBlogs,
    getOneBlog,
}