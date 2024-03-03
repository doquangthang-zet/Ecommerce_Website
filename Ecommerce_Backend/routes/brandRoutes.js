const express = require("express");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const { getAllBrand, getOneBrand, updateBrand, deleteBrand, createBrand } = require("../controllers/brandCtrl");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createBrand);
router.get("/", getAllBrand);
router.get("/:id", getOneBrand);
router.put("/:id", authMiddleware, isAdmin, updateBrand);
router.delete("/:id", authMiddleware, isAdmin, deleteBrand);

module.exports = router;