import app from "./src/index.js";
import connectDb from "./src/configs/db.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});
