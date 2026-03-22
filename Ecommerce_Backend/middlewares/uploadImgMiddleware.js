const multer = require("multer");
const sharp = require("sharp");

// 1. Store files in memory instead of disk
const multerStorage = multer.memoryStorage();

// 2. Filter only images
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file format"), false);
  }
};

// 3. Upload config
const uploadPhoto = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 2000000 }, // 2MB
});

// 4. Resize product images (IN MEMORY)
const productImageResize = async (req, res, next) => {
    if (!req.files || req.files.length === 0) return next();

    await Promise.all(
        req.files.map(async (file) => {
            const buffer = await sharp(file.buffer)
                // .resize(300, 300) // optional
                .toFormat("jpeg")
                .jpeg({ quality: 90 })
                .toBuffer();

            file.buffer = buffer; // overwrite buffer with processed image
        })
    );

    next();
};

// 5. Resize blog images (IN MEMORY)
const blogImageResize = async (req, res, next) => {
    if (!req.files || req.files.length === 0) return next();

    await Promise.all(
        req.files.map(async (file) => {
        const buffer = await sharp(file.buffer)
            .resize(300, 300)
            .toFormat("jpeg")
            .jpeg({ quality: 90 })
            .toBuffer();

        file.buffer = buffer;
        })
    );

    next();
};

module.exports = { uploadPhoto, productImageResize, blogImageResize };