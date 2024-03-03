const Brand = require("../models/brandModel");
const asyncHandler = require("express-async-handler");
const validateMongoDBId = require('../utils/validateMongoDBId');

// Create Brand
const createBrand = asyncHandler(async (req, res) => {
    try{
        const newBrand = await Brand.create(req.body);
        res.json(newBrand);
    } catch (err) {
        throw new Error(err);
    }
});

//Get all Brand
const getAllBrand = asyncHandler(async (req, res) => {
    try{
        const allBrand = await Brand.find();
        res.json(allBrand);
    } catch (err){
        throw new Error(err);
    }
});

//Get one Brand
const getOneBrand = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBId(id);

    try {
        const brand = await Brand.findById(id);
        res.json(brand);
    } catch (error) {
        throw new Error(error);
    }
});

//Update Brand
const updateBrand = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBId(id);

    try {
        const updatedBrand = await Brand.findByIdAndUpdate(id, req.body, {new: true});
        res.json(updatedBrand);
    } catch (error) {
        throw new Error(error);
    }
});

//Delete Brand
const deleteBrand = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBId(id);
    
    try {
        const deletedBrand = await Brand.findByIdAndDelete(id);
        res.json(deletedBrand);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = {createBrand, getAllBrand, getOneBrand, updateBrand, deleteBrand};