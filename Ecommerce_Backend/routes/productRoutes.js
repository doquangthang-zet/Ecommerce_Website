const express = require("express");
const { createProduct, getOneProduct, getAllProduct, updateProduct, deleteProduct, addToWishlist, rating } = require("../controllers/productCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createProduct);
router.get("/", getAllProduct);
router.put("/addToWishlist", authMiddleware, addToWishlist);
router.put("/rating", authMiddleware, rating);
router.get("/:id", getOneProduct);
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);

module.exports = router;