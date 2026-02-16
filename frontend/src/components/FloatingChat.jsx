import { useState, useRef, useEffect } from "react";
import { MdChat, MdClose, MdSend } from "react-icons/md";
import { apiFetch } from "../query/client";

const DEMO_REPLY =
  "This is a demo reply. Soon you'll be able to chat with AI here just like ChatGPT. Stay tuned!";

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
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
      const reply = data?.reply ?? DEMO_REPLY;
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: DEMO_REPLY }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Chatbox */}
      {open && (
        <div className="fixed bottom-20 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[480px] max-h-[70vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-gray-900 text-white">
            <span className="font-semibold">AI Chat</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/20"
              aria-label="Close"
            >
              <MdClose size={22} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
            {messages.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">
                Ask me anything. (Demo mode — real AI coming soon.)
              </p>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                    m.role === "user"
                      ? "bg-blue-600 text-white rounded-br-md"
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-md"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-2.5 text-sm text-gray-500">
                  Typing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 border-t border-gray-200 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <button
                type="button"
                onClick={sendMessage}
                disabled={loading}
                className="p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50"
                aria-label="Send"
              >
                <MdSend size={22} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FAB - bottom right */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all flex items-center justify-center"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? <MdClose size={26} /> : <MdChat size={26} />}
      </button>
    </>
  );
}
