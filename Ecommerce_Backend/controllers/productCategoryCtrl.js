const Category = require("../models/productCatergoryModel");
const asyncHandler = require("express-async-handler");
const validateMongoDBId = require('../utils/validateMongoDBId');

// Create category
const createCategory = asyncHandler(async (req, res) => {
    try{
        const newCategory = await Category.create(req.body);
        res.json(newCategory);
    } catch (err) {
        throw new Error(err);
    }
});

//Get all categories
const getAllCate = asyncHandler(async (req, res) => {
    try{
        const allCate = await Category.find();
        res.json(allCate);
    } catch (err){
        throw new Error(err);
    }
});

//Get one Category
const getOneCate = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBId(id);

    try {
        const cate = await Category.findById(id);
        res.json(cate);
    } catch (error) {
        throw new Error(error);
    }
});

//Update category
const updateCate = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBId(id);

    try {
        const updatedCate = await Category.findByIdAndUpdate(id, req.body, {new: true});
        res.json(updatedCate);
    } catch (error) {
        throw new Error(error);
    }
});

//Delete category
const deleteCate = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBId(id);
    
    try {
        const deletedCate = await Category.findByIdAndDelete(id);
        res.json(deletedCate);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = {createCategory, getAllCate, getOneCate, updateCate, deleteCate};