import { AI, default_prompt } from "../configs/ai_bot.js";
import ChatModel from "../models/chat.model.js";
import API_RES from "../utils/ApiRes.js";

const generatePrompt = async function (req, res) {
  const { userPrompt } = req.body;
  try {
    const query = `${default_prompt} ${userPrompt}`;

    console.log("AI: ", AI);

    const response = await AI.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: query,
    });

    return res.json({ botReply: response.candidates[0].content.parts[0].text });
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({ "Error: ": error, message: error.message });
  }
};

async function chatMessages(req, res) {
  const { chatId } = req.body.params.id;
  if (!chatId) {
    return res
      .status(400)
      .json(
        new API_RES(true, 400, "Chat id required", null, ["Chat id required"])
      );
  }

  try {
    const chatMessages = await ChatModel.find({ _id: chatId });
    if (!chatMessages) {
      return res
        .status(404)
        .json(
          new API_RES(true, 404, "No Chat message found", null, [
            "Chat not found",
          ])
        );
    }
    return res
      .status(200)
      .json(
        new API_RES(
          true,
          200,
          "Chat messages fetched successfully",
          chatMessages
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        new API_RES(false, 500, SERVER_MSG, null, [], [SERVER_ERR], error, req)
      );
  }
}
export { generatePrompt, chatMessages };
