import express from "express";
import {
  createBrand,
  deleteBrand,
  getAllBrand,
  getBrand,
  updateBrand,
} from "../controllers/brandController.js";
import { verifyAdmin, verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/", verifyToken, verifyAdmin, createBrand);
router.get("/all-brands", verifyToken, verifyAdmin, getAllBrand);
router.post("/:id", verifyToken, verifyAdmin, updateBrand);
router.delete("/:id", verifyToken, verifyAdmin, deleteBrand);
router.get("/:id", verifyToken, verifyAdmin, getBrand);

export default router;
