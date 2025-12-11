import app from "./src/index.js";
import connectDb from "./src/configs/db.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 5000;

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server Started on http://localhost:${port}`);
    });
  })
  .catch((e) => {
    console.log("Error Connecting with database: ", e);
  });
