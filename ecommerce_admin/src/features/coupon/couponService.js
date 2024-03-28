import axios from "axios";
import {baseUrl} from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

// Get all coupons of the web
const getCoupons = async () => {
    const response = await axios.get(`${baseUrl}coupon`, config);
    
    return response.data;
};

//Create coupon
const createCoupon = async (coupon) => {
    const response = await axios.post(`${baseUrl}coupon/`, coupon, config);
  
    return response.data;
};

const couponService = {
  getCoupons,
  createCoupon,
};

export default couponService;