import { useState, useRef, useEffect } from "react";
import { MdSend, MdAutoAwesome, MdPerson } from "react-icons/md";
import { apiFetch } from "../query/client";
import ChatMessageContent from "../components/chat/ChatMessageContent";

const DEMO_REPLY =
  "I'm your Buddy AI, trained for Virtual University. I can help with papers, material, and general questions.";

export default function AIChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);

    try {
      const res = await apiFetch("/api/chat/send", {
        method: "POST",
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      const reply = data?.reply ?? (res.ok ? DEMO_REPLY : "Something went wrong. Please try again.");
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Could not reach Buddy AI. Check your connection." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">AI Chat</h1>
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col min-h-[calc(100vh-12rem)]">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg">
                <MdAutoAwesome size={32} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">How can I help you today?</h3>
              <p className="text-sm text-gray-500 max-w-sm">
                I'm trained for Virtual University. Ask about papers, material, or any topic.
              </p>
            </div>
          )}

          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  m.role === "user" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"
                }`}
              >
                {m.role === "user" ? <MdPerson size={20} /> : <MdAutoAwesome size={20} />}
              </div>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                  m.role === "user"
                    ? "bg-indigo-600 text-white rounded-tr-md"
                    : "bg-gray-50 text-gray-800 border border-gray-100 rounded-tl-md"
                }`}
              >
                <ChatMessageContent content={m.content} role={m.role} typingEffect />
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3">
              <div className="shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <MdAutoAwesome size={20} className="text-gray-600" />
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-2xl rounded-tl-md px-4 py-3 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0ms]" />
                <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-gray-100 bg-white">
          <div className="relative flex rounded-2xl bg-gray-50 border border-gray-200 focus-within:border-indigo-300 focus-within:ring-2 focus-within:ring-indigo-500/20">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
              placeholder="Message Buddy AI..."
              className="w-full pl-4 pr-24 py-3.5 rounded-2xl bg-transparent text-gray-800 placeholder:text-gray-400 outline-none"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <MdSend size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
