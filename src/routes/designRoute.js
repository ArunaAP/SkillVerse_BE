import express from "express";
import {
  getAllDesigns,
  addDesign,
  likeDesign,
  getDesignById,
} from "../controllers/designController.js";
import {
  verifyDesigner,
  verifyClient,
  verifyAdmin,
  verifyToken,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllDesigns);
router.post("/", verifyDesigner, addDesign);
router.post("/:id/like", verifyToken, likeDesign);
router.get("/:id", getDesignById);

export default router;
