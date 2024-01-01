import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
  updateProduct,
} from "../controllers/productController.js";
import { verifyToken, verifyAdmin } from "../utils/verifyUser.js";

const router = express();

router.post("/", verifyAdmin, verifyToken, createProduct);
router.get("/", getAllProduct);
router.get("/:id", getProduct);
router.post("/:id", verifyAdmin, verifyToken, updateProduct);
router.delete("/:id", verifyAdmin, verifyToken, deleteProduct);

export default router;
