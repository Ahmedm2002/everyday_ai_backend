import { AI, default_prompt } from "../configs/ai_bot.js";

const generatePrompt = async function (req, res) {
  try {
    const { userPrompt } = req.body;
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

export default generatePrompt;
