import verfiyJwt from "../controllers/auth.controller.js";
import { Router } from "express";

const router = Router();

router.post("/verify-jwt", verfiyJwt);

export default router;
