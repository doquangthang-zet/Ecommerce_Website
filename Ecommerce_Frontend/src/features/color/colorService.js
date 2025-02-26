import axios from "axios";
import { baseUrl } from '../../utils/baseUrl';
import { config } from '../../utils/axiosconfig';

//Get all color
const getColors = async () => {
    const response = await axios.get(`${baseUrl}color`);

    if(response.data) {
        return response.data;
    }
}

//GET ONE product cate
const getOneColor = async (colorId) => {
    const response = await axios.get(`${baseUrl}color/${colorId}`);

    if(response.data) {
        return response.data;
    }
}

export const colorService = {
    getColors,
    getOneColor,
}