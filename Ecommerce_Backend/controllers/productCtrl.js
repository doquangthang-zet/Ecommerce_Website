const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const User = require("../models/userModel");
const validateMongoDBId = require('../utils/validateMongoDBId');

// Create a new product
const createProduct = asyncHandler(async (req, res) => {
    try{
        if(req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    } catch (err) {
        throw new Error(err);
    }
});

//Get all products
const getAllProduct = asyncHandler(async (req, res) => {
    try {
        // Filtering
        // MongoDB query based on some fields like category, price, ... and exclude some other fields
        const queryObj = {...req.query};
        const excludeFields = ["page", "limit", "sort", "fields"];
        excludeFields.forEach(element => delete queryObj[element]);

        // Replace some relational operators in query to right format in mongodb
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`);

        let query = Product.find(JSON.parse(queryStr));

        // Sorting
        if(req.query.sort) {
            const sortBy = req.query.sort.split(",").join(" ");
            query = query.sort(sortBy);
        } else {
            query = query.sort("-createdAt");
        }

        // Limiting fields
        if(req.query.fields) {
            const fields = req.query.fields.split(",").join(" ");
            query = query.select(fields);
        } else {
            query = query.select("-__v");
        }

        // Pagination
        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit);

        if(req.query.page) {
            const productCount = await Product.countDocuments();
            if(skip >= productCount) throw new Error("This page is not exist!")
        }

        const allProduct = await query;
        res.json(allProduct);
    } catch (err) {
        throw new Error(err);
    }
});

// Get a product
const getOneProduct = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBId(id);

    try {
        const product = await Product.findById(id);
        res.json(product);
    } catch (err) {
        throw new Error(err);
    }
});

// Update a product
const updateProduct = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBId(id);

    if(req.body.title) {
        req.body.slug = slugify(req.body.title);
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {new: true});
        res.json(updatedProduct);
    } catch (err) {
        throw new Error(err);
    }
});

// Delete a product
const deleteProduct = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBId(id);

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        res.json(deletedProduct);
    } catch (err) {
        throw new Error(err);
    }
});

// Add to wishlist
const addToWishlist = asyncHandler(async (req, res) => {
    const {_id} = req.user;
    const {prodId} = req.body;
    validateMongoDBId(_id);
    validateMongoDBId(prodId);

    try {
        const user = await User.findById(_id);
        const alreadyAdded = user?.wishlist?.find((item) => item?.toString() === prodId?.toString());

        if(alreadyAdded) {
            let user = await User.findByIdAndUpdate(_id, 
                {
                    $pull: {wishlist: prodId},
                },
                {new: true});

            res.json(user);
        } else {
            let user = await User.findByIdAndUpdate(_id, 
                {
                    $push: {wishlist: prodId},
                },
                {new: true});

            res.json(user);
        }
    } catch (err) {
        throw new Error(err);
    }
});

// Rating function
const rating = asyncHandler(async (req, res) => {
    const {_id} = req.user;
    const {star, prodId, comment} = req.body;
    validateMongoDBId(_id);
    validateMongoDBId(prodId);

    try {
        const product = await Product.findById(prodId);
        let alreadyRated = product.ratings.find((rate) => rate?.postedBy.toString() === _id?.toString());

        if(alreadyRated) {
            const updateRating = await Product.updateOne(
                {
                    ratings: {  $elemMatch: alreadyRated  }
                },
                {
                    $set: {  "ratings.$.star": star, "ratings.$.comment": comment  }
                },
                {new: true}
            );

            // res.json(updateRating);
        } else {
            const rateProduct = await Product.findByIdAndUpdate(prodId, 
                {
                    $push: {
                        ratings: {
                            star: star, postedBy: _id, comment: comment
                        },
                    },
                }, 
                {new: true}
            );

            // res.json(rateProduct);
        }

        // Calculate rating
        const getAllRatings = await Product.findById(prodId);
        let totalRating = getAllRatings.ratings.length;
        // Sum all ratings
        let ratingSum = getAllRatings.ratings.map((item) => item.star).reduce((prev, cur) => prev + cur, 0);
        let actualRating = Math.round(ratingSum / totalRating);
        let updatedProduct = await Product.findByIdAndUpdate(prodId, 
            {
                totalRating: actualRating,
            },
            {new: true}
        );

        res.json(updatedProduct)
    } catch (err) {
        throw new Error(err);
    }
});

module.exports = {createProduct, getOneProduct, getAllProduct, updateProduct, deleteProduct, addToWishlist, rating};