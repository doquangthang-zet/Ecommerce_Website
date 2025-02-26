const {cloudinaryUploadImg, cloudinaryDeleteImg} = require("../utils/cloudinary");
const fs = require("fs");
const asyncHandler = require("express-async-handler");

// Upload image to cloud
const uploadImages = asyncHandler(async (req, res) => {
    try {
        const uploader = (path) => cloudinaryUploadImg(path, "images");
        const urls = [];
        const files = req.files;

        for(const file of files) {
            const { path } = file;
            const newPath = await uploader(path);
            urls.push(newPath);
            // fs.unlinkSync(path)
            setTimeout(() => {
                try {
                    if (fs.existsSync(path)) fs.unlinkSync(path);
                    console.log('Files deleted successfully');
                  } catch (error) {
                    console.error('Error deleting file:', error);
                  }
            }, 2000); // Wait 2 seconds
        }

        const images = urls.map((file) => {
            return file;
        });

        res.json(images);
    } catch (err) {
        throw new Error(err);
    }
});

// Delete image from cloud
const deleteImages = asyncHandler(async (req, res) => {
    const {id} = req.params;

    try {
        const deleter = cloudinaryDeleteImg(id, "images");

        res.json({message: "Deleted"});
    } catch (err) {
        throw new Error(err);
    }
});

module.exports = {uploadImages, deleteImages};