import axios from "axios";
import {baseUrl} from "../../utils/baseUrl"

// Get all brands of the web
const getBrands = async () => {
    const response = await axios.get(`${baseUrl}brand`);

    return response.data;
};

const brandService = {
    getBrands
};

export default brandService;