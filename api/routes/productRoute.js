import express from "express";
import {
  addToWishlist,
  createProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
  rating,
  updateProduct,
} from "../controllers/productController.js";
import { verifyToken, verifyAdmin } from "../utils/verifyUser.js";

const router = express();

router.post("/", verifyAdmin, verifyToken, createProduct);
router.get("/", getAllProduct);
router.post("/wishlist", verifyToken, addToWishlist);
router.post("/rating", verifyToken, rating);

router.get("/:id", getProduct);
router.post("/:id", verifyAdmin, verifyToken, updateProduct);
router.delete("/:id", verifyAdmin, verifyToken, deleteProduct);

export default router;
