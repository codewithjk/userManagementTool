const express = require("express");
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
} = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");
const { upload } = require("../middleware/uploadFile");

const router = express.Router();

router
  .route("/")
  .get(protect, admin, getUsers)
  .post(protect, admin, createUser);

router
  .route("/:id")
  .get(protect, admin, getUserById)
  .put(protect, upload.single("image"), updateUser)
  .delete(protect, admin, deleteUser);

module.exports = router;
