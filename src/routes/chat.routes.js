import express from "express";
import {
  generatePrompt,
  chatMessages,
} from "../controllers/chat.controller.js";
const router = express.Router();

router.post("/prompt", generatePrompt);
router.get("/chat/:id", chatMessages);

export default router;
