const express = require("express");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const { getAllEnquiry, getOneEnquiry, updateEnquiry, deleteEnquiry, createEnquiry } = require("../controllers/enquiryCtrl");
const router = express.Router();

router.post("/", createEnquiry);
router.get("/", getAllEnquiry);
router.get("/:id", getOneEnquiry);
router.put("/:id", authMiddleware, isAdmin, updateEnquiry);
router.delete("/:id", authMiddleware, isAdmin, deleteEnquiry);

module.exports = router;