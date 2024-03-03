const express = require("express");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const { createCoupon, getAllCoupons, getOneCoupon, updateCoupon, deleteCoupon } = require("../controllers/couponCtrl");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCoupon);
router.get("/", authMiddleware, isAdmin, getAllCoupons);
router.get("/:id", authMiddleware, isAdmin, getOneCoupon);
router.put("/:id", authMiddleware, isAdmin, updateCoupon);
router.delete("/:id", authMiddleware, isAdmin, deleteCoupon);

module.exports = router;