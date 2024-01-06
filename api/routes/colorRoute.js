import express from "express";
import {
  createColor,
  deleteColor,
  getAllColor,
  getColor,
  updateColor,
} from "../controllers/colorController.js";
import { verifyAdmin, verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/", verifyToken, verifyAdmin, createColor);
router.get("/all-colors", verifyToken, verifyAdmin, getAllColor);
router.post("/:id", verifyToken, verifyAdmin, updateColor);
router.delete("/:id", verifyToken, verifyAdmin, deleteColor);
router.get("/:id", verifyToken, verifyAdmin, getColor);

export default router;
