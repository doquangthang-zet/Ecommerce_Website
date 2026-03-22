const { cloudinaryDeleteImg } = require("../utils/cloudinary");
const asyncHandler = require("express-async-handler");
const streamifier = require("streamifier");
const cloudinary = require("cloudinary").v2;

// Upload from buffer → Cloudinary
const uploadFromBuffer = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
        { folder: "images" },
        (error, result) => {
            if (result) resolve(result);
            else reject(error);
        }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

// Upload image to cloud
const uploadImages = asyncHandler(async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const urls = [];

    for (const file of req.files) {
        const result = await uploadFromBuffer(file.buffer);

        urls.push({
            url: result.secure_url,
            public_id: result.public_id,
        });
    }

    res.json(urls);
  } catch (err) {
    console.error(err);
    res.status(500).json({
        message: "Upload failed",
        error: err.message,
    });
  }
});

// Delete image from cloud
const deleteImages = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        await cloudinaryDeleteImg(id);
        res.json({ message: "Deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Delete failed",
            error: err.message,
        });
    }
});

module.exports = { uploadImages, deleteImages };