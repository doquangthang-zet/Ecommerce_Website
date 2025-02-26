import axios from "axios";
import { baseUrl } from '../../utils/baseUrl';
import { config } from '../../utils/axiosconfig';

//Get all brand
const getBrands = async () => {
    const response = await axios.get(`${baseUrl}brand`);

    if(response.data) {
        return response.data;
    }
}

//GET ONE product cate
const getOneBrand = async (brandId) => {
    const response = await axios.get(`${baseUrl}brand/${brandId}`);

    if(response.data) {
        return response.data;
    }
}

export const brandService = {
    getBrands,
    getOneBrand,
}