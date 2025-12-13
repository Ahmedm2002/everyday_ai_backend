import express from "express";
import {
  allChats,
  loginUser,
  registerUser,
  getAllUsers
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/chats/:user_id", allChats);
router.get('/get-all-secure', getAllUsers)

export default router;
