import chatRoutes from "./chat.routes.js";
import userRoutes from "./user.routes.js";
import { Router } from "express";

const router = Router();

router.use("/chat", chatRoutes);
router.use("/user", userRoutes);

router.get("/", (req, res) => {
  return res.status(200).json({ message: "Hi" });
});

export default router;
