import express from "express";
import generatePrompt from "../controllers/chat.controller.js";
const router = express.Router();

router.post("/prompt", generatePrompt);

export default router;
