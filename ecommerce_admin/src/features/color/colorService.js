import axios from "axios";
import {baseUrl} from "../../utils/baseUrl";
import api from "../../utils/axiosconfig";

// Get all colors of the web
const getColors = async () => {
    const response = await axios.get(`${baseUrl}color`);

    return response.data;
};

//Create color
const createColor = async (color) => {
    const response = await api.post("color/", color);
  
    return response.data;
};

// Get one color of the web
const getOneColor = async (id) => {
    const response = await api.get(`color/${id}`);

    return response.data;
};

//Update color
const updateColor = async (color) => {
    const response = await api.put(`color/${color.id}`, color.data);
  
    return response.data;
};

//Delete color
const deleteColor = async (id) => {
    const response = await api.delete(`color/${id}`);
  
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