import express from "express";
import {
  getUserChats,
  checkExistingChat,
} from "../controllers/chatController.js";
const router = express.Router();

router.get("/:userId", getUserChats);
router.get("/check/:clientId/:designerId", checkExistingChat);

export default router;
