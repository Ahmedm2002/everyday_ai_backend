import mongoose from "mongoose";

async function connectDb() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Failed to connect with database", error.message);
    return;
  }
}

export default connectDb;
