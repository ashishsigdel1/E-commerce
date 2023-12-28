import express from "express";
import {
  blockUser,
  createUser,
  deleteUser,
  getAllUser,
  getUser,
  logOut,
  loginUser,
  test,
  unblockUser,
  updateUser,
} from "../controllers/userController.js";
import { verifyAdmin, verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);
router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/update/:id", verifyToken, updateUser);
router.get("/logout", logOut);
router.get("/all-users", getAllUser);
router.get("/:id", verifyToken, verifyAdmin, getUser);
router.delete("/:id", verifyToken, deleteUser);
router.post("/block-user/:id", verifyToken, verifyAdmin, blockUser);
router.post("/unblock-user/:id", verifyToken, verifyAdmin, unblockUser);

export default router;
