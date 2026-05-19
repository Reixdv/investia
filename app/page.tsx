"use client";

import { useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Olá! Eu sou a InvestIA. Pergunte sobre ações, ETFs, dividendos, renda fixa, bolsa ou educação financeira.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!message.trim() || loading) return;

    const userMessage = message.trim();

    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMessage },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const text = await response.text();

      if (!text) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Erro: a IA não respondeu.",
          },
        ]);
        return;
      }

      const data = JSON.parse(text);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply || "Não consegui responder agora.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Erro ao conectar com a IA.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-green-400 font-semibold">
              Investimentos com Inteligência Artificial
            </span>

            <h1 className="text-5xl lg:text-7xl font-bold mt-4 leading-tight">
              Invista melhor com dados, IA e educação financeira
            </h1>

            <p className="text-gray-300 mt-6 text-lg">
              Aprenda a investir, acompanhe a bolsa de valores, simule carteiras
              e tire dúvidas em tempo real com um chatbot inteligente.
            </p>

            <div className="flex gap-4 mt-8">
              <button className="bg-green-400 text-black px-6 py-3 rounded-xl font-bold hover:bg-green-300 transition">
                Começar agora
              </button>

              <button className="border border-white/20 px-6 py-3 rounded-xl hover:bg-white/10 transition">
                Ver demonstração
              </button>
            </div>
          </div>

          <div className="bg-white/10 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl">
            <h2 className="text-xl font-bold mb-6">Bolsa hoje</h2>

            <div className="space-y-4">
              {[
                ["PETR4", "+2.35%", "R$ 38,42"],
                ["VALE3", "-1.12%", "R$ 61,80"],
                ["ITUB4", "+0.87%", "R$ 34,10"],
                ["BBDC4", "+1.44%", "R$ 15,90"],
              ].map(([acao, variacao, preco]) => (
                <div
                  key={acao}
                  className="flex justify-between items-center bg-black/30 p-4 rounded-2xl"
                >
                  <div>
                    <p className="font-bold">{acao}</p>
                    <p className="text-gray-400 text-sm">Ação brasileira</p>
                  </div>

                  <div className="text-right">
                    <p>{preco}</p>
                    <p
                      className={
                        variacao.startsWith("+")
                          ? "text-green-400"
                          : "text-red-400"
                      }
                    >
                      {variacao}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Tudo que você precisa para começar a investir
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            ["Chatbot de IA", "Tire dúvidas sobre ações, ETFs e renda variável."],
            ["Dashboard da Bolsa", "Veja preços e indicadores do mercado."],
            ["Simulador", "Simule investimentos de acordo com seu perfil."],
            ["Educação Financeira", "Aprenda do zero como investir."],
            ["Carteira Virtual", "Monte uma carteira simulada."],
            ["Análises Inteligentes", "Receba explicações simples com IA."],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="bg-white/10 border border-white/10 rounded-2xl p-6 hover:bg-white/15 transition"
            >
              <h3 className="text-xl font-bold mb-3">{title}</h3>
              <p className="text-gray-300">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-green-400/20 to-blue-500/20 border border-white/10 rounded-3xl p-8">
          <h2 className="text-3xl font-bold mb-6">
            Converse com sua IA financeira
          </h2>

          <div className="bg-black/40 rounded-2xl p-6">
            <div className="h-[420px] overflow-y-auto space-y-4 pr-2">
              {messages.map((item, index) => (
                <div
                  key={index}
                  className={`flex ${
                    item.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-5 py-4 leading-7 whitespace-pre-wrap ${
                      item.role === "user"
                        ? "bg-green-400 text-black"
                        : "bg-white/10 text-gray-100 border border-white/10"
                    }`}
                  >
                    {item.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="bg-white/10 text-gray-200 border border-white/10 rounded-2xl px-5 py-4 w-fit">
                  Pensando...
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Pergunte algo sobre investimentos..."
                className="flex-1 resize-none bg-white/10 border border-white/10 rounded-xl px-4 py-3 outline-none text-white placeholder:text-gray-400"
              />

              <button
                onClick={sendMessage}
                disabled={loading}
                className="bg-green-400 text-black px-6 rounded-xl font-bold hover:bg-green-300 transition disabled:opacity-50"
              >
                {loading ? "..." : "Enviar"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="px-6 py-10 text-center text-gray-400">
        <p>
          InvestIA © 2026 — Plataforma educacional. Não é recomendação de
          investimento.
        </p>
      </footer>
    </main>
  );
}