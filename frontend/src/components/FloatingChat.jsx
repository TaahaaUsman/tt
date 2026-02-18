import { useState, useRef, useEffect } from "react";
import {
  MdChat,
  MdClose,
  MdSend,
  MdAdd,
  MdHistory,
  MdAutoAwesome,
  MdPerson,
} from "react-icons/md";
import { apiFetch } from "../query/client";
import { motion, AnimatePresence } from "framer-motion";
import ChatMessageContent from "./chat/ChatMessageContent.jsx";

const DEMO_REPLY =
  "I'm your Buddy AI, trained for Virtual University. I can help with papers, material, and general questions.";

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(true);
  const [sessions, setSessions] = useState([
    { id: 1, title: "Quantum Physics help", active: true },
    { id: 2, title: "Midterm Study Plan", active: false },
    { id: 3, title: "Calc II Integration", active: false },
  ]);

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
      setMessages((prev) => [...prev, { role: "assistant", content: "Could not reach Buddy AI. Check your connection." }]);
    } finally {
      setLoading(false);
    }
  };

  const startNewChat = () => {
    setMessages([]);
    setShowHistory(false);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-0 md:p-6"
          >
            <motion.div
              initial={{ scale: 0.96, y: 8 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 8 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="w-full h-full max-w-6xl md:h-[85vh] bg-white md:rounded-2xl shadow-2xl border border-gray-200/80 overflow-hidden flex flex-col"
            >
              {/* Sidebar */}
              <AnimatePresence>
                {showHistory && (
                  <motion.aside
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 280, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="hidden lg:flex flex-col border-r border-gray-100 bg-[#f9fafb]"
                  >
                    <div className="p-4">
                      <button
                        onClick={startNewChat}
                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors"
                      >
                        <MdAdd size={18} /> New Session
                      </button>
                    </div>
                    <div className="flex-1 overflow-y-auto px-3 space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-2 py-2">Past Conversations</p>
                      {sessions.map((session) => (
                        <button
                          key={session.id}
                          className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${session.active ? "bg-indigo-600 text-white" : "text-gray-600 hover:bg-white"}`}
                        >
                          <MdHistory size={16} /> {session.title}
                        </button>
                      ))}
                    </div>
                    <div className="p-4 border-t border-gray-200">
                      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-gray-200">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                          <MdPerson size={18} />
                        </div>
                        <span className="text-xs font-semibold text-gray-800">Premium User</span>
                      </div>
                    </div>
                  </motion.aside>
                )}
              </AnimatePresence>

              {/* Main chat */}
              <main className="flex-1 flex flex-col min-h-0 bg-white">
                <header className="shrink-0 px-4 md:px-6 py-3 border-b border-gray-100 flex items-center justify-between bg-white">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowHistory(!showHistory)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors hidden lg:block text-gray-500"
                    >
                      <MdHistory size={20} className={showHistory ? "text-indigo-600" : ""} />
                    </button>
                    <div>
                      <h2 className="text-sm font-bold flex items-center gap-2 text-gray-900">
                        Buddy AI
                        <span className="px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-700 text-[10px] font-semibold uppercase">Pro</span>
                      </h2>
                      <p className="text-[10px] text-gray-500 font-medium">Virtual University specialist</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                  >
                    <MdClose size={22} />
                  </button>
                </header>

                {/* Messages – ChatGPT-style scroll area */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden">
                  <div className="max-w-3xl mx-auto px-4 md:px-6 py-6 space-y-6">
                    {messages.length === 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-16 text-center"
                      >
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg">
                          <MdAutoAwesome size={28} className="text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">How can I help you today?</h3>
                        <p className="text-sm text-gray-500 max-w-sm">
                          I'm trained for Virtual University. Ask about papers, material, or any topic.
                        </p>
                      </motion.div>
                    )}

                    {messages.map((m, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
                      >
                        <div
                          className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                            m.role === "user" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {m.role === "user" ? <MdPerson size={18} /> : <MdAutoAwesome size={18} />}
                        </div>
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                            m.role === "user"
                              ? "bg-indigo-600 text-white rounded-tr-md"
                              : "bg-gray-50 text-gray-800 border border-gray-100 rounded-tl-md shadow-sm"
                          }`}
                        >
                          <ChatMessageContent content={m.content} role={m.role} typingEffect />
                        </div>
                      </motion.div>
                    ))}

                    {loading && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex gap-3"
                      >
                        <div className="shrink-0 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                          <MdAutoAwesome size={18} className="text-gray-600" />
                        </div>
                        <div className="bg-gray-50 border border-gray-100 rounded-2xl rounded-tl-md px-4 py-3 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0ms]" />
                          <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:150ms]" />
                          <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:300ms]" />
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* Input – GPT-style */}
                <div className="shrink-0 p-4 md:p-6 bg-white border-t border-gray-100">
                  <div className="max-w-3xl mx-auto">
                    <div className="relative flex rounded-2xl bg-gray-50 border border-gray-200 focus-within:border-indigo-300 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                        placeholder="Message Buddy AI..."
                        className="w-full pl-4 pr-24 py-3.5 rounded-2xl bg-transparent text-gray-800 placeholder:text-gray-400 text-sm font-medium outline-none"
                      />
                      <button
                        onClick={sendMessage}
                        disabled={loading || !input.trim()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <MdSend size={18} />
                      </button>
                    </div>
                    <p className="mt-2 text-[10px] text-gray-400 text-center">
                      Buddy AI can make mistakes. Verify important information.
                    </p>
                  </div>
                </div>
              </main>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-[110] w-14 h-14 bg-indigo-600 text-white rounded-2xl shadow-xl hover:bg-indigo-700 flex items-center justify-center border-2 border-white"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <MdClose size={26} />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
              <MdChat size={26} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
