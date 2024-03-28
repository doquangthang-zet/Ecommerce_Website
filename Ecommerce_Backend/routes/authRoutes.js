const express = require('express');
const { createUser, loginUserCtrl, getAllUsers, getOneUser, deleteOneUser, updateOneUser, blockUser, unblockUser, handleRefreshToken, logout, updatePassword, forgotPasswordToken, resetPassword, loginAdminCtrl, getWishlist, saveAddress, userCart, getUserCart, deleteCart, applyCoupon, createOrder, getOrder, updateOrder, getAllOrder } = require('../controllers/userCtrl');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.post("/adminLogin", loginAdminCtrl);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.put("/password", authMiddleware, updatePassword);
router.post("/forgotPasswordToken", forgotPasswordToken);
router.put("/resetPassword/:token", resetPassword);

router.get("/wishlist", authMiddleware, getWishlist);
router.put("/saveAddress", authMiddleware, saveAddress);
router.post("/cart", authMiddleware, userCart);
router.get("/cart", authMiddleware, getUserCart);
router.delete("/cart", authMiddleware, deleteCart);
router.post("/applyCoupon", authMiddleware, applyCoupon);
router.post("/cart/order", authMiddleware, createOrder);
router.get("/order/all", authMiddleware, isAdmin, getAllOrder);
router.get("/order", authMiddleware, getOrder);
router.put("/order/updateOrder/:id", authMiddleware, isAdmin, updateOrder);

router.get("/all", getAllUsers);
router.get("/:id", authMiddleware, isAdmin, getOneUser);
router.delete("/delete/:id", deleteOneUser);
router.put("/update", authMiddleware, updateOneUser);

router.put("/blockUser/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblockUser/:id", authMiddleware, isAdmin, unblockUser);

module.exports = router;