import axios from "axios";
import {baseUrl} from "../../utils/baseUrl"

// Get all blog cates of the web
const getBCategories = async () => {
    const response = await axios.get(`${baseUrl}blogCategory`);

    return response.data;
};

const bCateService = {
    getBCategories
};

export default bCateService;