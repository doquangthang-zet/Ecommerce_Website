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

// Get monthly order
const getMonthlyOrders = async () => {
    const response = await axios.get(`${baseUrl}user/getMonthIncome`, config);

    return response.data;
};

// Get year order
const getYearlyOrdersCount = async () => {
    const response = await axios.get(`${baseUrl}user/getYearCount`, config);

    return response.data;
};

//Get all orders
const getAllOrders = async () => {
    const response = await axios.get(`${baseUrl}user/order/all`, config);

    return response.data;
};

//Get single order
const getSingleOrder = async (id) => {
    const response = await axios.get(`${baseUrl}user/order/${id}`, config);

    return response.data;
};

// Update order status
const updateOrderStatus = async (orderData) => {
    const response = await axios.put(`${baseUrl}user/order/updateOrder/${orderData.id}`, {status: orderData.status}, config);

    return response.data;
};

const authService = {
    login,
    getOrders,
    getMonthlyOrders,
    getYearlyOrdersCount,
    getAllOrders,
    getSingleOrder,
    updateOrderStatus,
};

export default authService;