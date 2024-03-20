import axios from "axios";
import {baseUrl} from "../../utils/baseUrl"

// Get all colors of the web
const getColors = async () => {
    const response = await axios.get(`${baseUrl}color`);

    return response.data;
};

const colorService = {
    getColors
};

export default colorService;