const Color = require("../models/colorModel");
const asyncHandler = require("express-async-handler");
const validateMongoDBId = require('../utils/validateMongoDBId');

// Create Color
const createColor = asyncHandler(async (req, res) => {
    try{
        const newColor = await Color.create(req.body);
        res.json(newColor);
    } catch (err) {
        throw new Error(err);
    }
});

//Get all Color
const getAllColor = asyncHandler(async (req, res) => {
    try{
        const allColor = await Color.find();
        res.json(allColor);
    } catch (err){
        throw new Error(err);
    }
});

//Get one Color
const getOneColor = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBId(id);

    try {
        const color = await Color.findById(id);
        res.json(color);
    } catch (error) {
        throw new Error(error);
    }
});

//Update Color
const updateColor = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBId(id);

    try {
        const updatedColor = await Color.findByIdAndUpdate(id, req.body, {new: true});
        res.json(updatedColor);
    } catch (error) {
        throw new Error(error);
    }
});

//Delete Color
const deleteColor = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBId(id);
    
    try {
        const deletedColor = await Color.findByIdAndDelete(id);
        res.json(deletedColor);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = {createColor, getAllColor, getOneColor, updateColor, deleteColor};