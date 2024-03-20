import axios from "axios";
import {baseUrl} from "../../utils/baseUrl"

// Get all users of the web
const getUsers = async () => {
    const response = await axios.get(`${baseUrl}user/all`);

    return response.data;
};

const customerService = {
    getUsers
};

export default customerService;