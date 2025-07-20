import express from "express";
import connectDb from "./src/configs/db.js";
import dotenv from "dotenv";
import chatRoutes from "./src/routes/chat.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import cors from "cors";
import { corsOptions } from "./src/configs/cors.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 5000;

connectDb();

app.use(cors(corsOptions));

app.use("/chat", chatRoutes);
app.use("/user", userRoutes);

app.get("/", async function (req, res) {
  return res.json({ message: "Hi there" });
});

app.listen(port, () => {
  console.log("Server started");
  console.log("Port: ", port);
});
