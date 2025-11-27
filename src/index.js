import express from "express";
import chatRoutes from "./routes/chat.routes.js";
import userRoutes from "./routes/user.routes.js";
import cors from "cors";
import { corsOptions } from "./configs/cors.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors(corsOptions));

app.use("/chat", chatRoutes);
app.use("/user", userRoutes);

app.get("/", async function (req, res) {
  return res.status(200).json({ message: "Hi there" });
});

export default app;
