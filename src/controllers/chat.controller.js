import { AI, default_prompt } from "../configs/ai_bot.js";
import ChatModel from "../models/chat.model.js";
import API_RES from "../utils/ApiRes.js";
import validateFields from "../utils/validation.js";
import CONSTANTS from "../constants.js";

const SERVER_ERR = CONSTANTS.API_ERRORS.SERVER_ERR;
const SERVER_MSG = CONSTANTS.API_ERRORS.SERVER_MSG;

const generatePrompt = async function (req, res) {
  const { userPrompt, user_id, chatId } = req.body;

  const errors = validateFields({ user_id, userPrompt });
  if (errors.length > 0) {
    return res
      .status(400)
      .json(new API_RES(true, 400, "Missing Fields", null, errors));
  }

  try {
    const query = `${default_prompt} ${userPrompt}`;

    const response = await AI.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: query,
    });

    const botReply = response.candidates[0].content.parts[0].text;
    // const botReply = "Dummy response : " + Date.now();

    let chat;

    if (!chatId) {
      chat = await ChatModel.create({
        user_id,
        messages: [
          {
            user: userPrompt,
            bot: botReply,
          },
        ],
      });
    } else {
      chat = await ChatModel.findByIdAndUpdate(
        chatId,
        {
          $push: {
            messages: {
              user: userPrompt,
              bot: botReply,
            },
          },
        },
        { new: true }
      );

      if (!chat) {
        return res
          .status(404)
          .json(
            new API_RES(true, 404, "Chat not found", null, ["Invalid chatId"])
          );
      }
    }

    return res.status(200).json(
      new API_RES(
        true,
        200,
        "Bot reply generated successfully",
        {
          chatId: chat._id,
          botReply,
        },
        []
      )
    );
  } catch (error) {
    return res
      .status(500)
      .json(
        new API_RES(false, 500, SERVER_MSG, null, [SERVER_ERR], error, req)
      );
  }
};

async function chatMessages(req, res) {
  const chatId = req.params.id;
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
