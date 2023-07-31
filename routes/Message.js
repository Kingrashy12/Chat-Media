import express from "express";
import {
  GetAllUnread,
  ReadMessage,
  createMessage,
  getMessage,
  getUnreadMessage,
} from "../controllers/Message.js";

const router = express.Router();

router.post("/new", createMessage);
router.get("/:chatId", getMessage);
router.get("/:userId/all", GetAllUnread);
router.get("/:chatId/unread", getUnreadMessage);
router.patch("/:chatId/read", ReadMessage);

export default router;
