import axios from "axios";
import { baseUrl } from '../../utils/baseUrl';
import { config } from '../../utils/axiosconfig';

//Get all blogCate
const getBlogCates = async () => {
    const response = await axios.get(`${baseUrl}blogCategory`);

    if(response.data) {
        return response.data;
    }
}

//GET ONE product cate
const getOneBlogCate = async (blogCateId) => {
    const response = await axios.get(`${baseUrl}blogCategory/${blogCateId}`);

    if(response.data) {
        return response.data;
    }
}

export const blogCateService = {
    getBlogCates,
    getOneBlogCate,
}