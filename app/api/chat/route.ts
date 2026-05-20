import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "API funcionando",
  });
}

export async function POST(req: Request) {
  const body = await req.json();

  return NextResponse.json({
    reply: "TESTE OK. Você perguntou: " + body.message,
  });
}
