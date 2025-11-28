import express from "express";
import {
  allChats,
  loginUser,
  registerUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/chats/:id", allChats);

export default router;
