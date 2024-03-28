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

const bCateService = {
    getBCategories,
    createBlogCate,
};

export default bCateService;