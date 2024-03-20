import axios from "axios";
import {baseUrl} from "../../utils/baseUrl"

// Get all category of the web
const getPCategories = async () => {
    const response = await axios.get(`${baseUrl}productCategory`);

    return response.data;
};

const categoryService = {
    getPCategories
};

export default categoryService;