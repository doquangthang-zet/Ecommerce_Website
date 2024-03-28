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

const blogService = {
    getBlogs,
    createBlog,
};

export default blogService;