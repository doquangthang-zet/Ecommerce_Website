import axios from "axios";
import { baseUrl } from '../../utils/baseUrl';
import { config } from '../../utils/axiosconfig';

//Get all prodCate
const getProdCates = async () => {
    const response = await axios.get(`${baseUrl}productCategory`);

    if(response.data) {
        return response.data;
    }
}

//GET ONE product cate
const getOneProdCate = async (prodCateId) => {
    const response = await axios.get(`${baseUrl}productCategory/${prodCateId}`);

    if(response.data) {
        return response.data;
    }
}

export const prodCateService = {
    getProdCates,
    getOneProdCate,
}