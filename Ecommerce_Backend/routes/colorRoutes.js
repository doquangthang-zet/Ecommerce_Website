const express = require("express");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const { getAllColor, getOneColor, updateColor, deleteColor, createColor } = require("../controllers/colorCtrl");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createColor);
router.get("/", getAllColor);
router.get("/:id", getOneColor);
router.put("/:id", authMiddleware, isAdmin, updateColor);
router.delete("/:id", authMiddleware, isAdmin, deleteColor);

module.exports = router;