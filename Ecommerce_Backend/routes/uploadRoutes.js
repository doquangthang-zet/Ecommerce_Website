const express = require("express");
const { uploadImages, deleteImages } = require("../controllers/uploadCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const { uploadPhoto, productImageResize } = require("../middlewares/uploadImgMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, uploadPhoto.array("images", 10), productImageResize, uploadImages);
router.delete("/deleteImage/:id", authMiddleware, isAdmin, deleteImages);

module.exports = router;