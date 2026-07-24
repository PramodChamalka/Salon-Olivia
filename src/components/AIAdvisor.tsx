"use client";
import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Sparkles, Send } from "lucide-react";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

type AIAdvisorProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  variant?: "floating" | "embedded";
};

export function AIAdvisor({ isOpen, setIsOpen, variant = "floating" }: AIAdvisorProps) {
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
      const response = await fetch("http://localhost:8000/chat", {
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

      // Adjust this line to match whatever key your FastAPI endpoint
      // actually returns, e.g. data.answer, data.response, data.reply
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
      {/* Floating Button */}
      {variant === "floating" && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-salon-dark text-white p-4 rounded-full shadow-2xl hover:bg-black transition-transform hover:scale-105 z-50 flex items-center group"
        >
          <Sparkles className="mr-2 text-salon-gold animate-pulse" size={20} />
          <span className="font-medium mr-2">AI Style Advisor</span>
          <MessageSquare size={20} />
        </button>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <div
          className={
            variant === "floating"
              ? "fixed bottom-6 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border border-gray-100 flex flex-col h-[500px] animate-in slide-in-from-bottom-10"
              : "w-full bg-white rounded-2xl overflow-hidden border border-gray-100 flex flex-col h-[600px]"
          }
        >
          {/* Header */}
          <div className="bg-salon-dark text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-salon-gold p-2 rounded-full mr-3">
                <Sparkles size={16} />
              </div>
              <div>
                <h3 className="font-serif font-bold">Olivia AI</h3>
                <p className="text-xs text-gray-300">Style Advisor</p>
              </div>
            </div>
            {variant === "floating" && (
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-white"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Chat Body */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-4">
            {messages.map((msg, idx) =>
              msg.role === "assistant" ? (
                <div key={idx} className="flex items-start animate-in fade-in">
                  <div className="bg-salon-cream text-salon-dark p-3 rounded-2xl rounded-tl-none max-w-[85%] text-sm shadow-sm whitespace-pre-wrap">
                    {msg.text}
                  </div>
                </div>
              ) : (
                <div
                  key={idx}
                  className="flex items-start justify-end animate-in fade-in"
                >
                  <div className="bg-salon-dark text-white p-3 rounded-2xl rounded-tr-none max-w-[85%] text-sm shadow-sm whitespace-pre-wrap">
                    {msg.text}
                  </div>
                </div>
              ),
            )}

            {isLoading && (
              <div className="flex items-start animate-in fade-in">
                <div className="bg-salon-cream text-salon-dark p-3 rounded-2xl rounded-tl-none text-sm shadow-sm flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 bg-salon-dark/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-salon-dark/50 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-salon-dark/50 rounded-full animate-bounce" />
                </div>
              </div>
            )}

            {error && (
              <div className="text-xs text-red-500 text-center">{error}</div>
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
              className="flex-1 text-sm border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:border-salon-gold disabled:opacity-50"
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="bg-salon-dark text-white p-2 rounded-full hover:bg-black transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
