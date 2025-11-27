import app from "./src";
import dotenv from "dotenv";
import connectDb from "./src/configs/db";

const port = process.env.PORT || 5000;

dotenv.config({
  path: "./.env",
});

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log("Server started");
      console.log("Port: ", port);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
