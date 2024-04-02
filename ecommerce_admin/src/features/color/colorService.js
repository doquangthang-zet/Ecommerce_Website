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

// Get one color of the web
const getOneColor = async (id) => {
    const response = await axios.get(`${baseUrl}color/${id}`, config);

    return response.data;
};

//Update color
const updateColor = async (color) => {
    const response = await axios.put(`${baseUrl}color/${color.id}`, color.data, config);
  
    return response.data;
};

//Delete color
const deleteColor = async (id) => {
    const response = await axios.delete(`${baseUrl}color/${id}`, config);
  
    return response.data;
};


const colorService = {
    getColors,
    createColor,
    getOneColor,
    updateColor,
    deleteColor,
};

export default colorService;