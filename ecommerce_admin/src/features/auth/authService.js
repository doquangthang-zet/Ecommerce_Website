import axios from "axios";
import {baseUrl} from "../../utils/baseUrl"

const userFromLocalstorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
const config = {
    headers: {
        'Authorization': `Bearer ${userFromLocalstorage.token}`,
        "Accept" : "application/json",
    },
};

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