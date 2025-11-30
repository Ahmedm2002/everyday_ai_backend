import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    user_id: String,
    messages: [
      {
        user: String,
        bot: String,
      },
    ],
  },
  { timestamps: true }
);

const ChatModel = new mongoose.model("Chat", chatSchema);

export default ChatModel;
