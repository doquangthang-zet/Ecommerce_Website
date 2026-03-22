import api from "../../utils/axiosconfig";

// Get all coupons of the web
const getCoupons = async () => {
    const response = await api.get("coupon");
    
    return response.data;
};

//Create coupon
const createCoupon = async (coupon) => {
    const response = await api.post("coupon/", coupon);
  
    return response.data;
};

// Get one coupon of the web
const getOneCoupon = async (id) => {
  const response = await api.get(`coupon/${id}`);

  return response.data;
};

//Update coupon
const updateCoupon = async (coupon) => {
  const response = await api.put(`coupon/${coupon.id}`, coupon.data);

  return response.data;
};

//Delete coupon
const deleteCoupon = async (id) => {
  const response = await api.delete(`coupon/${id}`);

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