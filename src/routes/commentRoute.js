// routes/commentRoutes.js
import express from "express";
import {
  addComment,
  getCommentsByThread,
} from "../controllers/commentController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:id", addComment);
router.get("/:id", getCommentsByThread);

export default router;
