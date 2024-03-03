const Coupon = require("../models/couponModel");
const asyncHandler = require("express-async-handler");
const validateMongoDBId = require('../utils/validateMongoDBId');

// Create new coupon
const createCoupon = asyncHandler(async (req, res) => {
    try{
        const newCoupon = await Coupon.create(req.body);
        res.json(newCoupon);
    } catch (err) {
        throw new Error(err);
    }
});


//Get all coupons
const getAllCoupons = asyncHandler(async (req, res) => {
    try{
        const allCoupon = await Coupon.find();
        res.json(allCoupon);
    } catch (err){
        throw new Error(err);
    }
});

//Get one Coupon
const getOneCoupon = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBId(id);

    try {
        const coupon = await Coupon.findById(id);
        res.json(coupon);
    } catch (error) {
        throw new Error(error);
    }
});

//Update Coupon
const updateCoupon = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBId(id);

    try {
        const updatedCoupon = await Coupon.findByIdAndUpdate(id, req.body, {new: true});
        res.json(updatedCoupon);
    } catch (error) {
        throw new Error(error);
    }
});

//Delete Coupon
const deleteCoupon = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBId(id);
    
    try {
        const deletedCoupon = await Coupon.findByIdAndDelete(id);
        res.json(deletedCoupon);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = {createCoupon, getAllCoupons, getOneCoupon, updateCoupon, deleteCoupon};