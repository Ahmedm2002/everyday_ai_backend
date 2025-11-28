import express from "express";
import cors from "cors";
import { corsOptions } from "./configs/cors.js";
import router from "./routes/index.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));

app.use("/api", router);

export default app;
