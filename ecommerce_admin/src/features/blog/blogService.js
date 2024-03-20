import axios from "axios";
import {baseUrl} from "../../utils/baseUrl"

// Get all blogs of the web
const getBlogs = async () => {
    const response = await axios.get(`${baseUrl}blog`);

    return response.data;
};

const blogService = {
    getBlogs
};

export default blogService;