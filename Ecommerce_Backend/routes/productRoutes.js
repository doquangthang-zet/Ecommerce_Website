const express = require("express");
const { createProduct, getOneProduct, getAllProduct, updateProduct, deleteProduct, addToWishlist, rating, uploadImages, deleteImages } = require("../controllers/productCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const { uploadPhoto, productImageResize } = require("../middlewares/uploadImgMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createProduct);
router.put("/upload", authMiddleware, isAdmin, uploadPhoto.array("images", 10), productImageResize, uploadImages);
router.delete("/deleteImage/:id", authMiddleware, isAdmin, deleteImages);
router.get("/", getAllProduct);
router.put("/addToWishlist", authMiddleware, addToWishlist);
router.put("/rating", authMiddleware, rating);
router.get("/:id", getOneProduct);
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);

module.exports = router;