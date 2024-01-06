import express from "express";
import {
  createInquiry,
  deleteInquiry,
  getAllInquiry,
  getInquiry,
  updateInquiry,
} from "../controllers/inquiryController.js";
import { verifyAdmin, verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/", verifyToken, verifyAdmin, createInquiry);
router.get("/all-inquirys", verifyToken, verifyAdmin, getAllInquiry);
router.post("/:id", verifyToken, verifyAdmin, updateInquiry);
router.delete("/:id", verifyToken, verifyAdmin, deleteInquiry);
router.get("/:id", verifyToken, verifyAdmin, getInquiry);

export default router;
