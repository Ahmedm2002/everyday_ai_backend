import express from "express";
import cors from "cors";
import { corsOptions } from "./configs/cors.js";
import router from "./routes/index.js";
import API_RES from "./utils/ApiRes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));

app.use("/api", router);
app.get('/', (req, res) => {
    res.status(200).json(new API_RES(true, 200, "Backend Working fine", null, []))
})

export default app;
