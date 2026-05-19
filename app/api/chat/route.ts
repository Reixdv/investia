import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "Você é uma IA financeira educacional. Explique investimentos de forma simples.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    return NextResponse.json({
      reply: completion.choices[0]?.message?.content,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      reply: "Erro ao conectar com a Groq.",
    });
  }
}
