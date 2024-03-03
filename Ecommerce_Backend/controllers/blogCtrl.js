const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDBId = require('../utils/validateMongoDBId');
const {cloudinaryUploadImg} = require("../utils/cloudinary");
const fs = require("fs");

// Create new blog
const createBlog = asyncHandler(async (req, res) => {
    try{
        const newBlog = await Blog.create(req.body);
        res.json(newBlog);
    } catch (err) {
        throw new Error(err);
    }
});

//Get all blogs
const getAllBlog = asyncHandler(async (req, res) => {
    try{
        const allBlog = await Blog.find();
        res.json(allBlog);
    } catch (err){
        throw new Error(err);
    }
});

//Get one blog (increase number of views)
const getOneBlog = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBId(id);

    try {
        // await Blog.findById(id);
        const blog = await Blog.findByIdAndUpdate(id, {$inc: {numViews: 1}}, {new: true}).populate("likes").populate("dislikes");
        res.json(blog);
    } catch (error) {
        throw new Error(error);
    }
});

//Update blog
const updateBlog = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBId(id);
    
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {new: true});
        res.json(updatedBlog);
    } catch (error) {
        throw new Error(error);
    }
});

//Delete blog
const deleteBlog = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBId(id);

    try {
        const deletedBlog = await Blog.findByIdAndDelete(id);
        res.json(deletedBlog);
    } catch (error) {
        throw new Error(error);
    }
});

// Like blog
const likeBlog = asyncHandler(async (req, res) => {
    const {blogId} = req.body;
    validateMongoDBId(blogId);

    // Find the blog user likes
    const blog = await Blog.findById(blogId);

    // Find current logged in user
    const currentUserId = req?.user?._id;

    // Check if the user already liked the blog
    const alreadyLiked = blog?.isLiked;

    // Check if the user already disliked the blog
    const alreadyDisliked = blog?.dislikes?.find(
        (userId) => {
            if (userId?.toString() === currentUserId?.toString()) return userId;
        }
    );

    // Condition to update dislike status
    if(alreadyDisliked) {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: {dislikes: currentUserId},
            isDisliked: false,
        }, {new: true});

        // res.json(blog);
    }

    // Condition to update like status
    if(alreadyLiked) {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: {likes: currentUserId},
            isLiked: false,
        }, {new: true});

        res.json(blog);
    } else {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $push: {likes: currentUserId},
            isLiked: true,
        }, {new: true});

        res.json(blog);
    }
})

// Dislike blog
const dislikeBlog = asyncHandler(async (req, res) => {
    const {blogId} = req.body;
    validateMongoDBId(blogId);

    // Find the blog user likes
    const blog = await Blog.findById(blogId);

    // Find current logged in user
    const currentUserId = req?.user?._id;

    // Check if the user already disliked the blog
    const alreadyDisliked = blog?.isDisliked;

    // Check if the user already liked the blog
    const alreadyLiked = blog?.likes?.find(
        (userId) => {
            if (userId?.toString() === currentUserId?.toString()) return userId;
        }
    );

    // Condition to update dislike status
    if(alreadyLiked) {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: {likes: currentUserId},
            isLiked: false,
        }, {new: true});

        // res.json(blog);
    }

    // Condition to update like status
    if(alreadyDisliked) {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: {dislikes: currentUserId},
            isDisliked: false,
        }, {new: true});

        res.json(blog);
    } else {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $push: {dislikes: currentUserId},
            isDisliked: true,
        }, {new: true});

        res.json(blog);
    }
});

// Upload image to cloud
const uploadImages = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBId(id);

    try {
        const uploader = (path) => cloudinaryUploadImg(path, "images");
        const urls = [];
        const files = req.files;

        for(const file of files) {
            const {path} = file;
            const newPath = await uploader(path);
            urls.push(newPath);
            fs.unlinkSync(path);

        }

        const findBlog = await Blog.findByIdAndUpdate(id, 
            {
                images: urls.map((file) => {
                    return file;
                }),
            }, 
            {new: true}
        );

        res.json(findBlog)
    } catch (err) {
        throw new Error(err);
    }
});

module.exports = {createBlog, getAllBlog, getOneBlog, updateBlog, deleteBlog, likeBlog, dislikeBlog, uploadImages};