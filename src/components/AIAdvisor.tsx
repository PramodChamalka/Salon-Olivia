"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Sparkles, Send, Bot } from "lucide-react";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

type AIAdvisorProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  variant?: "floating" | "embedded";
};

export function AIAdvisor({
  isOpen,
  setIsOpen,
  variant = "floating",
}: AIAdvisorProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Hi there! I'm Olivia AI, your Style Advisor. Ask me anything about our services, pricing, or what might suit you.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = async () => {
    const question = input.trim();
    if (!question || isLoading) return;

    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/ai-advisor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      const answer =
        data.answer ??
        data.response ??
        "Sorry, I didn't get a response for that.";

      setMessages((prev) => [...prev, { role: "assistant", text: answer }]);
    } catch (err) {
      console.error(err);
      setError("Something went wrong reaching the advisor. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      {/* Modernized Floating AI Advisor Button */}
      {variant === "floating" && !isOpen && (
        <div className="fixed bottom-6 right-6 z-50 group">
          {/* Ambient Glow Aura */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#B76E79] via-[#D4AF37] to-[#B76E79] opacity-70 blur-md transition-all duration-500 group-hover:opacity-100 group-hover:blur-lg animate-pulse" />

          <button
            onClick={() => setIsOpen(true)}
            className="relative flex items-center gap-3 rounded-full bg-[#B76E79] px-5 py-3 text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:bg-[#a35e69] hover:scale-105 active:scale-95"
            aria-label="Open AI Style Advisor"
          >
            {/* AI Bot Badge with Sparkles */}
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/40">
              <Bot size={18} className="text-white" />
              <Sparkles
                size={12}
                className="absolute -top-1 -right-1 text-[#D4AF37] animate-spin"
                style={{ animationDuration: "6s" }}
              />
            </div>

            <span className="text-sm font-semibold tracking-wide">
              AI Style Advisor
            </span>

            <MessageCircle
              size={18}
              className="text-white/80 transition-transform group-hover:translate-x-0.5"
            />
          </button>
        </div>
      )}

      {/* Chat Widget Container */}
      {isOpen && (
        <div
          className={
            variant === "floating"
              ? "fixed bottom-6 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border border-gray-100 flex flex-col h-[500px] animate-in slide-in-from-bottom-10"
              : "w-full bg-white rounded-2xl overflow-hidden border border-gray-100 flex flex-col h-[600px]"
          }
        >
          {/* Header */}
          <div className="bg-[#B76E79] text-white p-4 flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-3">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/40">
                <Bot size={20} className="text-white" />
                <Sparkles
                  size={12}
                  className="absolute -top-1 -right-1 text-[#D4AF37]"
                />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base leading-tight">
                  Olivia AI
                </h3>
                <p className="text-xs text-white/80">Style Advisor</p>
              </div>
            </div>
            {variant === "floating" && (
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white rounded-full p-1 hover:bg-white/10 transition-colors"
                aria-label="Close AI Advisor"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Chat Body */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-4">
            {messages.map((msg, idx) =>
              msg.role === "assistant" ? (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 animate-in fade-in"
                >
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#B76E79] text-white text-xs">
                    <Bot size={14} />
                  </div>
                  <div className="bg-white border border-gray-100 text-stone-800 p-3 rounded-2xl rounded-tl-none max-w-[85%] text-sm shadow-sm whitespace-pre-wrap leading-relaxed">
                    {msg.text}
                  </div>
                </div>
              ) : (
                <div
                  key={idx}
                  className="flex items-start justify-end animate-in fade-in"
                >
                  <div className="bg-[#B76E79] text-white p-3 rounded-2xl rounded-tr-none max-w-[85%] text-sm shadow-sm whitespace-pre-wrap leading-relaxed">
                    {msg.text}
                  </div>
                </div>
              ),
            )}

            {isLoading && (
              <div className="flex items-start gap-2.5 animate-in fade-in">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#B76E79] text-white text-xs">
                  <Bot size={14} />
                </div>
                <div className="bg-white border border-gray-100 text-stone-800 p-3 rounded-2xl rounded-tl-none text-sm shadow-sm flex gap-1.5 items-center">
                  <span className="w-2 h-2 bg-[#B76E79]/60 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 bg-[#B76E79]/60 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 bg-[#B76E79]/60 rounded-full animate-bounce" />
                </div>
              </div>
            )}

            {error && (
              <div className="text-xs text-red-500 text-center font-medium bg-red-50 p-2 rounded-lg">
                {error}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about services, pricing..."
              disabled={isLoading}
              className="flex-1 text-sm border border-stone-200 rounded-full px-4 py-2 focus:outline-none focus:border-[#B76E79] focus:ring-1 focus:ring-[#B76E79] disabled:opacity-50"
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="bg-[#B76E79] text-white p-2.5 rounded-full hover:bg-[#a35e69] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
              aria-label="Send message"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
