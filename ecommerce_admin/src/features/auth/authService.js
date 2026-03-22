import axios from "axios";
import {baseUrl} from "../../utils/baseUrl";
import api from "../../utils/axiosconfig";

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
    const response = await api.get("user/order/all");

    return response.data;
};

// Get monthly order
const getMonthlyOrders = async () => {
    const response = await api.get("user/getMonthIncome");

    return response.data;
};

// Get year order
const getYearlyOrdersCount = async () => {
    const response = await api.get("user/getYearCount");

    return response.data;
};

//Get all orders
const getAllOrders = async () => {
    const response = await api.get("user/order/all");

    return response.data;
};

//Get single order
const getSingleOrder = async (id) => {
    const response = await api.get(`user/order/${id}`);

    return response.data;
};

// Update order status
const updateOrderStatus = async (orderData) => {
    const response = await api.put(`user/order/updateOrder/${orderData.id}`, {status: orderData.status});

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