import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

export const openai = apiKey ? new OpenAI({ apiKey }) : null;

export const VU_SPECIALIST_PROMPT = `I am an AI tool specialist and trained for a specific Virtual University. I can also provide you general information. I am a specialist to help you prepare for your Virtual University papers, material, past papers, and related study support.`;
