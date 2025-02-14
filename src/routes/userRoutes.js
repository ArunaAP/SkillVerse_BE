import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { authorizedRoles } from "../middleware/roleMiddleware.js";
import { addAdmin, getUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/user", verifyToken, authorizedRoles("admin"), (req, res) => {
  res.json({ message: "Welcome user" });
});

router.post("/add-admin", addAdmin);
router.get("/:id", getUser);

export default router;
