const express = require("express");
const { createBlog, getAllBlog, getOneBlog, updateBlog, deleteBlog, likeBlog, dislikeBlog, uploadImages } = require("../controllers/blogCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const { uploadPhoto, blogImageResize } = require("../middlewares/uploadImgMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createBlog);
router.put("/likes", authMiddleware, likeBlog);
router.put("/dislikes", authMiddleware, dislikeBlog);
router.put("/upload/:id", authMiddleware, isAdmin, uploadPhoto.array("images", 2), blogImageResize, uploadImages);
router.get("/", getAllBlog);
router.get("/:id", getOneBlog);
router.put("/:id", authMiddleware, isAdmin, updateBlog);
router.delete("/:id", authMiddleware, isAdmin, deleteBlog);


module.exports = router;