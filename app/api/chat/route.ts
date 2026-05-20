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
            "Você é uma IA financeira educacional. Explique investimentos de forma simples. Não recomende compra ou venda direta.",
        },
        {
          role: "user",
          content: message,
        },
      ],
      model: "openai/gpt-oss-120b",
      temperature: 1,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: false,
    });

    return NextResponse.json({
      reply: chatCompletion.choices[0]?.message?.content || "Sem resposta.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      reply: "Erro ao conectar com a Groq.",
    });
  }
}
