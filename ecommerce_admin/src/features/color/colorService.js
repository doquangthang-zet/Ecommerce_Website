import axios from "axios";
import {baseUrl} from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

// Get all colors of the web
const getColors = async () => {
    const response = await axios.get(`${baseUrl}color`);

    return response.data;
};

//Create color
const createColor = async (color) => {
    const response = await axios.post(`${baseUrl}color/`, color, config);
  
    return response.data;
};


const colorService = {
    getColors,
    createColor,
};

export default colorService;