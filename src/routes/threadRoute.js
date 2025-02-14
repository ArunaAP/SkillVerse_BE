// routes/threadRoutes.js
import express from "express";
import {
  createThread,
  getAllThreads,
  getThreadById,
  deleteThread,
} from "../controllers/threadController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createThread);
router.get("/", getAllThreads);
router.get("/:id", getThreadById);
router.delete("/:id", deleteThread);

export default router;
