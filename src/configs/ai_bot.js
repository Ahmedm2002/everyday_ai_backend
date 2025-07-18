import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const AI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  apiVersion: "v1alpha",
});

const default_prompt = `You are an ai agent named EveryDay AI. you have to response the user queries with the best outcome make sure to use some humor if needed and make the conversation porlong. Here is the user's prompt: `;

export { AI, default_prompt };
