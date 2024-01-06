import express from "express";
import {
  addToWishlist,
  createProduct,
  deleteImages,
  deleteProduct,
  getAllProduct,
  getProduct,
  rating,
  updateProduct,
  uploadImages,
} from "../controllers/productController.js";
import { verifyToken, verifyAdmin } from "../utils/verifyUser.js";
import { productImgResize, uploadPhoto } from "../utils/uploadImages.js";

const router = express();

router.post("/", verifyAdmin, verifyToken, createProduct);
router.put(
  "/upload",
  verifyToken,
  verifyAdmin,
  uploadPhoto.array("images", 10),
  productImgResize,
  uploadImages
);
router.get("/", getAllProduct);
router.post("/wishlist", verifyToken, addToWishlist);
router.post("/rating", verifyToken, rating);

router.get("/:id", getProduct);
router.post("/:id", verifyAdmin, verifyToken, updateProduct);
router.delete("/:id", verifyAdmin, verifyToken, deleteProduct);
router.delete("/delete-img/:id", verifyAdmin, verifyToken, deleteImages);


export default router;
