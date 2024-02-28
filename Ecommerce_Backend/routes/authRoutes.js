const express = require('express');
const { createUser, loginUserCtrl, getAllUsers, getOneUser, deleteOneUser, updateOneUser, blockUser, unblockUser } = require('../controllers/userCtrl');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.get("/all", getAllUsers);
router.get("/:id", authMiddleware, isAdmin, getOneUser);
router.delete("/delete/:id", deleteOneUser);
router.put("/update", authMiddleware, updateOneUser);

router.put("/blockUser/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblockUser/:id", authMiddleware, isAdmin, unblockUser);

module.exports = router;