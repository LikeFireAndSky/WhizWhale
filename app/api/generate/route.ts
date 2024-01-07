// route.ts
import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { userMessage } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: userMessage || "Hello, GPT!" },
      ],
      temperature: 0.5,
      max_tokens: 64,
      top_p: 1,
    });

    res.json({ response: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching response" });
  }
}
