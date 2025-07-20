import mongoose from "mongoose";

const messegeSchema = new mongoose.Schema({
  role: String,
  content: String,
});

const chatSchema = new mongoose.Schema(
  {
    userId: String,
    messages: [messegeSchema],
  },
  { timestamps: true }
);

const Chat = new mongoose.model("Chat", chatSchema);

export default Chat;
