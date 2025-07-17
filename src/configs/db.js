import mongoose from "mongoose";

const connectDb = async function () {
  try {
    mongoose.connect(process.env.DATABASE_URL);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Failed to connect with database", err.message);
    return;
  }
};

export default connectDb;
