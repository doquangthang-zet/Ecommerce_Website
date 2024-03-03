const Enquiry = require("../models/enquiryModel");
const asyncHandler = require("express-async-handler");
const validateMongoDBId = require('../utils/validateMongoDBId');

// Create Enquiry
const createEnquiry = asyncHandler(async (req, res) => {
    try{
        const newEnquiry = await Enquiry.create(req.body);
        res.json(newEnquiry);
    } catch (err) {
        throw new Error(err);
    }
});

//Get all Enquiry
const getAllEnquiry = asyncHandler(async (req, res) => {
    try{
        const allEnquiry = await Enquiry.find();
        res.json(allEnquiry);
    } catch (err){
        throw new Error(err);
    }
});

//Get one Enquiry
const getOneEnquiry = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBId(id);

    try {
        const enquiry = await Enquiry.findById(id);
        res.json(enquiry);
    } catch (error) {
        throw new Error(error);
    }
});

//Update Enquiry
const updateEnquiry = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBId(id);

    try {
        const updatedEnquiry = await Enquiry.findByIdAndUpdate(id, req.body, {new: true});
        res.json(updatedEnquiry);
    } catch (error) {
        throw new Error(error);
    }
});

//Delete Enquiry
const deleteEnquiry = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBId(id);
    
    try {
        const deletedEnquiry = await Enquiry.findByIdAndDelete(id);
        res.json(deletedEnquiry);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = {createEnquiry, getAllEnquiry, getOneEnquiry, updateEnquiry, deleteEnquiry};