import express from "express";
import {
  createChat,
  findChat,
  findChatId,
  findUserChat,
} from "../controllers/Chat.js";

const router = express.Router();

router.post("/", createChat);
router.get("/find", findChat);
router.get("/find/all/:userId", findUserChat);
router.get("/current/:chatId", findChatId);

export default router;
