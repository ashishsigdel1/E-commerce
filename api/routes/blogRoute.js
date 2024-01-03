import express from "express";
import { verifyAdmin, verifyToken } from "../utils/verifyUser.js";
import {
  createBlog,
  deleteBlog,
  dislikeBlog,
  getAllBlog,
  getBlog,
  likeBlog,
  updateBlog,
} from "../controllers/blogController.js";

const router = express.Router();

router.post("/", verifyToken, verifyAdmin, createBlog);
router.post("/likes", verifyToken, verifyAdmin, likeBlog);
router.post("/dislikes", verifyToken, verifyAdmin, dislikeBlog);
router.post("/:id", verifyToken, verifyAdmin, updateBlog);
router.delete("/:id", verifyToken, verifyAdmin, deleteBlog);
router.get("/:id", getBlog);
router.get("/", getAllBlog);

export default router;
