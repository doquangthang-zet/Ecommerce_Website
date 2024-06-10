const { generateJWT } = require('../config/jwt');
const User = require('../models/userModel');
const Product = require('../models/productModel');
const Cart = require('../models/cartModel');
const Coupon = require('../models/couponModel');
const Order = require('../models/orderModel');
const asyncHandler = require("express-async-handler");
const validateMongoDBId = require('../utils/validateMongoDBId');
const { generateRefreshToken } = require('../config/refreshToken');
const jwt = require("jsonwebtoken");
const { sendEmail } = require('./emailCtrl');
const crypto = require("crypto");
const uniqid = require("uniqid");

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
        const refreshToken = await generateRefreshToken(findUser?._id);
        const updatedUser = await User.findByIdAndUpdate(findUser._id, {refreshToken: refreshToken}, {new: true});

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000,
        });

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

// Admin login
const loginAdminCtrl = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    //Check if email existed or the password is correct
    const findAdmin = await User.findOne({email});

    if(findAdmin?.role !== "admin") throw new Error("Not authorized!");
    
    if(findAdmin && await findAdmin.isPasswordMatched(password)) {
        const refreshToken = await generateRefreshToken(findAdmin?._id);
        const updatedUser = await User.findByIdAndUpdate(findAdmin._id, {refreshToken: refreshToken}, {new: true});

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000,
        });

        res.json({
            _id: findAdmin?._id,
            firstname: findAdmin?.firstname,
            lastname: findAdmin?.lastname,
            mobile: findAdmin?.mobile,
            email: findAdmin?.email,
            token: generateJWT(findAdmin?._id),
        });
    } else {
        throw new Error("Invalid Credentials!");
    }
});

// Handle refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;

    if(!cookie.refreshToken) throw new Error("No refresh token in cookies!");

    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({refreshToken});

    if(!user) throw new Error("No refresh token presented in DB or not match!");

    jwt.verify(refreshToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if(err || user.id !== decoded.id) throw new Error("Something wrong with refresh token!");

        const accessToken = generateJWT(user?._id);
        res.json({accessToken}); 
    });
});

// Update password
const updatePassword = asyncHandler(async (req, res) => {
    const {_id} = req.user;
    const {password} = req.body;
    validateMongoDBId(_id);
    const user = await User.findById(_id);

    if(password) {
        user.password = password;
        const updatedPassword = await user.save();
        res.json(updatedPassword);
    } else {
        res.json(user);
    }
});

// Forgot password
const forgotPasswordToken = asyncHandler(async (req, res) => {
    const {email} = req.body;
    const user = await User.findOne({email});

    if(!user) throw new Error("User not found!");
    try {
        const token = await user.createPasswordResetToken();
        await user.save();
        const resetURL = `Hi. Please follow this link to reset your password. This link will expire in 10 minutes from now. <a href='http://localhost:5000/api/user/resetPassword/${token}'>Click here</a>`;
        const data = {
            to: email,
            subject: "Forgot password link",
            text: "Hey User",
            htm: resetURL
        };
        sendEmail(data);
        res.json(token);
    } catch (err) {
        throw new Error(err);
    }
});

//Reset password
const resetPassword = asyncHandler(async (req, res) => {
    const {password} = req.body;
    const {token} = req.params;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: {$gt: Date.now()},
    });

    if(!user) throw new Error("Token expired! Please try again later!");
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.json(user);
});

// Logout 
const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;

    if(!cookie.refreshToken) throw new Error("No refresh token in the cookie!");

    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({refreshToken});

    if(!user) {
        res.clearCookie("refreshToken", {
            httpOnly: true, 
            secure: true,
        });

        return res.sendStatus(204); // Forbidden
    };

    await User.findOneAndUpdate({refreshToken}, {
        refreshToken: "",
    });

    res.clearCookie("refreshToken", {
        httpOnly: true, 
        secure: true,
    });

    res.sendStatus(204); // Forbidden
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

//Get wishlist
const getWishlist = asyncHandler(async (req, res) => {
    const {_id} = req.user;

    try{
        const user = await User.findById(_id).populate("wishlist");

        res.json(user);
    } catch (err) {
        throw new Error(err);
    }
});

// Save user address
const saveAddress = asyncHandler(async (req, res) => {
    const {_id} = req.user;
    validateMongoDBId(_id);

    try{
        const updatedUser = await User.findByIdAndUpdate(_id, {
            address: req?.body?.address,
        }, {
            new: true,
        });

        res.json(updatedUser);
    } catch (err) {
        throw new Error(err);
    }
});

// Create cart
const userCart = asyncHandler(async (req, res) => {
    const {prodId, color, quantity, price} = req.body;
    const {_id} = req.user;
    validateMongoDBId(_id);

    try{
        const newCart = await new Cart({
            productId: prodId,
            userId: _id,
            color,
            price,
            quantity,
        }).save();

        res.json(newCart);
    } catch (err) {
        throw new Error(err)
    }
});

//Get user cart
const getUserCart = asyncHandler(async (req, res) => {
    const {_id} = req.user;
    validateMongoDBId(_id);

    try{
        const cart = await Cart.find({userId: _id}).populate("productId").populate("color");
        res.json(cart);
    } catch(err) {
        throw new Error(err);
    }
});

// Delete product from cart
const deleteProductFromCart = asyncHandler(async (req, res) => {
    const {_id} = req.user;
    const {id} = req.params;
    validateMongoDBId(_id);
    validateMongoDBId(id);

    try{
        const cart = await Cart.deleteOne({userId: _id, _id: id});
        res.json(cart);
    } catch(err) {
        throw new Error(err);
    }
});

// Update product quantity from cart
const updateQuantityFromCart = asyncHandler(async (req, res) => {
    const {_id} = req.user;
    const {id} = req.params;
    const {newQuantity} = req.body;

    validateMongoDBId(_id);
    validateMongoDBId(id);

    try{
        const cartItem = await Cart.findOne({userId: _id, _id: id});
        cartItem.quantity = newQuantity;
        cartItem.save();
        res.json(cartItem);
    } catch(err) {
        throw new Error(err);
    }
});

// Delete cart
const deleteCart = asyncHandler(async (req, res) => {
    const {_id} = req.user;
    validateMongoDBId(_id);

    try{
        const user = await User.findById(_id);
        const cart = await Cart.findOneAndDelete({userId: user?._id});
        res.json(cart);
    } catch(err) {
        throw new Error(err);
    }
});

// Apply coupon
const applyCoupon = asyncHandler(async (req, res) => {
    const {coupon} = req.body;
    const {_id} = req.user;
    validateMongoDBId(_id);

    try{
        const getCoupon = await Coupon.findOne({name: coupon});
        if(getCoupon === null) throw new Error("Invalid coupon!")
        const user = await User.findById(_id);
        let {products, cartTotal} = await Cart.findOne({orderBy: user?._id}).populate(
            "products.product", "_id title price"
        );
        let totalAfterDiscount = (cartTotal - (cartTotal * getCoupon.discount) / 100).toFixed(2);

        const updatedCart = await Cart.findOneAndUpdate({orderBy: user?._id}, {
            totalAfterDiscount: totalAfterDiscount
        }, {new: true});

        res.json(updatedCart);
    } catch(err) {
        throw new Error(err);
    }
});

// Order
const createOrder = asyncHandler(async(req, res) => {
    const {COD, couponApplied} = req.body;
    const {_id} = req.user;
    validateMongoDBId(_id);

    try{
        if(!COD) throw new Error("Create cash order failed!");
        const user = await User.findById(_id);
        let userCart = await Cart.findOne({orderBy: user?._id});
        let finalAmount = 0;
        
        if(couponApplied && userCart.totalAfterDiscount) {
            finalAmount = userCart.totalAfterDiscount;
        } else {
            finalAmount = userCart.cartTotal;
        }

        let newOrder = await new Order({
            products: userCart.products,
            paymentIntent: {
                id: uniqid(),
                method: "COD",
                amount: finalAmount,
                status: "Cash on delivery",
                created: Date.now(),
                currency: "usd",
            },
            orderStatus: "Cash on delivery",
            orderBy: user?._id
        }).save();

        let updateProduct = userCart.products.map((item) => {
            return {
                updateOne: {
                    filter: {_id: item.product._id},
                    update: {$inc: {quantity: -item.count, sold: item.count}},
                },
            };
        });

        let updatedProduct = await Product.bulkWrite(updateProduct, {});
        res.json({message: "success"});
    } catch(err) {
        throw new Error(err);
    }
});

//Get all order
const getAllOrder = asyncHandler(async(req, res) => {
    try{
        const allUserOrder = await Order.find().populate("products.product").populate("orderBy").exec();
        res.json(allUserOrder);
    } catch(err) {
        throw new Error(err);
    }
});

//Get user order
const getOrder = asyncHandler(async(req, res) => {
    const {_id} = req.user;
    validateMongoDBId(_id);

    try{
        const userOrder = await Order.findOne({orderBy: _id}).populate("products.product").populate("orderBy").exec();
        res.json(userOrder);
    } catch(err) {
        throw new Error(err);
    }
});

//Update order status
const updateOrder = asyncHandler(async(req, res) => {
    const {id} = req.params;
    const {status} = req.body;
    validateMongoDBId(id);

    try{
        const updatedOrder = await Order.findByIdAndUpdate(id, {
            orderStatus: status,
            paymentIntent: {
                status: status,
            },
        }, {new: true});
        res.json(updatedOrder);
    } catch(err) {
        throw new Error(err);
    }
});

module.exports = {createUser, loginUserCtrl, loginAdminCtrl, getAllUsers, getOneUser, deleteOneUser, updateOneUser, blockUser, unblockUser, handleRefreshToken, logout, updatePassword, forgotPasswordToken, resetPassword, getWishlist, saveAddress, userCart, getUserCart, deleteCart, applyCoupon, createOrder, getOrder, getAllOrder, updateOrder, deleteProductFromCart, updateQuantityFromCart};