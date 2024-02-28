const { generateJWT } = require('../config/jwt');
const User = require('../models/userModel');
const asyncHandler = require("express-async-handler");
const validateMongoDBId = require('../utils/validateMongoDBId');

// Register a new user
const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({email: email});

    if(!findUser) {
        //Create new user
        const newUser = await User.create(req.body);
        res.json(newUser);
    } else {
       throw new Error("User already existed!")
    }
});


//Login function
const loginUserCtrl = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    //Check if email existed or the password is correct
    const findUser = await User.findOne({email});
    
    if(findUser && await findUser.isPasswordMatched(password)) {
        res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            mobile: findUser?.mobile,
            email: findUser?.email,
            token: generateJWT(findUser?._id),
        });
    } else {
        throw new Error("Invalid Credentials!");
    }
});

// Get all users
const getAllUsers = asyncHandler(async (req, res) => {
    try{
        const getUsers = await User.find();
        res.json(getUsers);
    } catch(err) {
        throw new Error(err);
    }
});

// Get a single user
const getOneUser = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBId(id);

    try{
        const getOne = await User.findById(id);
        res.json(getOne);
    } catch (err) {
        throw new Error(err);
    }
});

// Update a user
const updateOneUser = asyncHandler(async (req, res) => {
    const {_id} = req.user;
    validateMongoDBId(_id);
    try{
        const updatedUser = await User.findByIdAndUpdate(_id, {
            firstname: req?.body?.firstname,
            lastname: req?.body?.lastname,
            mobile: req?.body?.mobile,
            email: req?.body?.email,
        }, {
            new: true,
        });

        res.json(updatedUser);
    } catch (err) {
        throw new Error(err);
    }
});

// Delete a user
const deleteOneUser = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBId(id);

    try{
        const deleteOne = await User.findByIdAndDelete(id);
        res.json(deleteOne);
    } catch (err) {
        throw new Error(err);
    }
});

// Block a user
const blockUser = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBId(id);

    try{
        const block = await User.findByIdAndUpdate(id, {
            isBlocked: true,
        }, {
            new: true,
        });

        res.json(block);
    } catch (err) {
        throw new Error(err);
    }
});

//Unblock user
const unblockUser = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBId(id);
    
    try{
        const unblock = await User.findByIdAndUpdate(id, {
            isBlocked: false,
        }, {
            new: true,
        });

        res.json(unblock);
    } catch (err) {
        throw new Error(err);
    }
});

module.exports = {createUser, loginUserCtrl, getAllUsers, getOneUser, deleteOneUser, updateOneUser, blockUser, unblockUser};