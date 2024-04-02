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

// Get one coupon of the web
const getOneCoupon = async (id) => {
  const response = await axios.get(`${baseUrl}coupon/${id}`, config);

  return response.data;
};

//Update coupon
const updateCoupon = async (coupon) => {
  const response = await axios.put(`${baseUrl}coupon/${coupon.id}`, coupon.data, config);

  return response.data;
};

//Delete coupon
const deleteCoupon = async (id) => {
  const response = await axios.delete(`${baseUrl}coupon/${id}`, config);

  return response.data;
};

const couponService = {
  getCoupons,
  createCoupon,
  getOneCoupon,
  updateCoupon,
  deleteCoupon,
};

export default couponService;