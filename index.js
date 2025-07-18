import express from "express";
import connectDb from "./src/configs/db.js";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import chatRoutes from "./src/routes/chat.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

connectDb();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  apiVersion: "v1alpha",
});

app.use(
  cors({
    origin: true,
  })
);

console.log("Ai: ", ai);

app.use("/chat", chatRoutes);
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log("Server started");
  console.log("Port: ", port);
});
