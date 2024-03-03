const express = require("express");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const { createCategory, getAllCate, getOneCate, updateCate, deleteCate } = require("../controllers/blogCategoryCtrl");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCategory);
router.get("/", getAllCate);
router.get("/:id", getOneCate);
router.put("/:id", authMiddleware, isAdmin, updateCate);
router.delete("/:id", authMiddleware, isAdmin, deleteCate);

module.exports = router;