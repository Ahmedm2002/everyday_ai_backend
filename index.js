import express from "express";
import connectDb from "./src/configs/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

connectDb();

app.listen(port, () => {
  console.log("Server started");
  console.log("Port: ", port);
});
