import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "Você é uma IA financeira educacional que explica investimentos de forma simples.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    return NextResponse.json({
      reply: completion.choices[0]?.message?.content || "Sem resposta.",
    });
  } catch (error: any) {
    console.error("ERRO GROQ:", error);

    return NextResponse.json({
      reply: "Erro ao conectar com a IA.",
    });
  }
}
