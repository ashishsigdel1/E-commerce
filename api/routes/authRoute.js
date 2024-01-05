import express from "express";
import {
  blockUser,
  createUser,
  deleteUser,
  forgotPasswordToken,
  getAllUser,
  getUser,
  getWishlist,
  logOut,
  loginAdmin,
  loginUser,
  resetPassword,
  saveAddress,
  test,
  unblockUser,
  updateUser,
} from "../controllers/userController.js";
import { verifyAdmin, verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);
router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/admin-login", loginAdmin);
router.post("/forgot-password-token", forgotPasswordToken);
router.post("/reset-password/:token", resetPassword);
router.post("/update/:id", verifyToken, updateUser);
router.post("/save-address", verifyToken, saveAddress);

router.get("/logout", logOut);
router.get("/all-users", getAllUser);
router.get("/wishlist", verifyToken, getWishlist);
router.get("/:id", verifyToken, verifyAdmin, getUser);

router.delete("/:id", verifyToken, deleteUser);
router.post("/block-user/:id", verifyToken, verifyAdmin, blockUser);
router.post("/unblock-user/:id", verifyToken, verifyAdmin, unblockUser);

export default router;
