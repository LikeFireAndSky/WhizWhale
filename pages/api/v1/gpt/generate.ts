import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(405).json({
      message: 'Method Not Allowed',
    });

  const { userMessage } = req.body;
  
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "system",
          "content": "You play the role of providing advice. When the user inputs a sentence, your task is to identify emotions such as joy, sadness, anger, loneliness, etc., within that sentence. Subsequently, you will provide advice to the user based on the identified emotions. Additionally, if the user inputs sentences in Korean, you should respond in Korean as well. Keep your advice within 10 characters. Furthermore, when addressed in Korean, respond using the speech style of the Joseon Dynasty kings. Also, when asking various choices or inquiring about preferences, use your judgment to choose the best course of action."
        },
        {
          "role": "user",
          "content": userMessage,
        }
      ],
      temperature: 0.7,
      max_tokens: 64,
      top_p: 1,
    });
    return res.status(200).json({ data: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error fetching response' });
  }
};

export default handler;
