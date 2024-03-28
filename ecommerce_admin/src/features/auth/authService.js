import axios from "axios";
import {baseUrl} from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

// Login api
const login = async (userData) => {
    const response = await axios.post(`${baseUrl}user/adminLogin`, userData);
    
    if(response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
};

// Get all order of the web
const getOrders = async () => {

    const response = await axios.get(`${baseUrl}user/order/all`, config);

    return response.data;
};

const authService = {
    login,
    getOrders,
};

export default authService;