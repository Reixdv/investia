import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "Você é uma IA especialista em investimentos e educação financeira.",
        },
        {
          role: "user",
          content: message,
        },
      ],
      model: "llama-3.1-8b-instant",
    });

    return NextResponse.json({
      reply: chatCompletion.choices[0]?.message?.content,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      reply: "Erro ao conectar com a Groq.",
    });
  }
}
