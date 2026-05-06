import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Anthropic API call ───────────────────────────────────────────────────────
async function askClaude(messages) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });
  const data = await res.json();
  return data.reply ?? "Sorry, dobara try karo!";
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconBot = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 001.659 1.591L19.5 14.5M14.25 3.104c.251.023.501.05.75.082M19.5 14.5l-1.409.465a2.25 2.25 0 00-1.591 2.147V21M5 14.5l1.409.465A2.25 2.25 0 017 17.112V21m0 0h10m-10 0a2 2 0 01-2-2v-.5m12 2.5a2 2 0 002-2v-.5" />
  </svg>
);
const IconClose = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const IconSend = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
  </svg>
);
const IconSparkle = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
    <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5z" clipRule="evenodd" />
  </svg>
);

// ─── Typing dots ──────────────────────────────────────────────────────────────
const TypingDots = () => (
  <div className="flex gap-1 items-center px-4 py-3">
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="w-2 h-2 rounded-full"
        style={{ background: "var(--blue-3)" }}
        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
      />
    ))}
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ChatBot() {
  const [chatOpen, setChatOpen] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Namaste! 👋 Main aapki kaise madad kar sakta hoon?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Show popup after 1.5s, auto-dismiss after 1 min
  useEffect(() => {
    const showTimer = setTimeout(() => setPopupVisible(true), 1500);
    const hideTimer = setTimeout(() => setPopupVisible(false), 61500);
    return () => { clearTimeout(showTimer); clearTimeout(hideTimer); };
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when chat opens
  useEffect(() => {
    if (chatOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [chatOpen]);

  const handleOpen = () => {
    setChatOpen(true);
    setPopupVisible(false);
    setHasInteracted(true);
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    // Build API-friendly history (exclude first greeting for cleaner context)
    const apiHistory = newMessages
      .slice(1)
      .map((m) => ({ role: m.role, content: m.content }));

    try {
      const reply = await askClaude(apiHistory);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Oops! Network error. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  // ── Variants ────────────────────────────────────────────────────────────────
  const chatVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 20, originX: 1, originY: 1 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
    exit: { opacity: 0, scale: 0.85, y: 20, transition: { duration: 0.2 } },
  };

  const popupVariants = {
    hidden: { opacity: 0, x: 20, scale: 0.9 },
    visible: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 20, delay: 0.1 } },
    exit: { opacity: 0, x: 20, scale: 0.9, transition: { duration: 0.2 } },
  };

  const msgVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 22 } },
  };

  return (
    <>
      {/* ── Popup tooltip ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {popupVisible && !chatOpen && (
          <motion.div
            variants={popupVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed bottom-24 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl max-w-[220px]"
            style={{
              background: "linear-gradient(135deg, var(--blue-1), var(--blue-2))",
              border: "1px solid rgba(17,138,178,0.4)",
              boxShadow: "0 8px 32px rgba(0,80,157,0.35), 0 0 0 1px rgba(17,138,178,0.15)",
            }}
          >
            {/* Glow dot */}
            <div className="relative flex-shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-pink)] block" />
              <motion.span
                className="absolute inset-0 rounded-full bg-[var(--accent-pink)]"
                animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
            </div>

            <p className="text-sm font-medium text-white leading-snug">
              How can I help you? ✨
            </p>

            <button
              onClick={() => setPopupVisible(false)}
              className="ml-auto flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors text-white/70 hover:text-white"
            >
              <IconClose />
            </button>

            {/* Arrow */}
            <div
              className="absolute -bottom-2 right-8 w-4 h-2 overflow-hidden"
              style={{ filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.2))" }}
            >
              <div
                className="w-4 h-4 rotate-45 -translate-y-2"
                style={{ background: "var(--blue-2)" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Chat window ───────────────────────────────────────────────────── */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            variants={chatVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed bottom-24 right-6 z-50 flex flex-col rounded-3xl overflow-hidden"
            style={{
              width: "min(380px, calc(100vw - 48px))",
              height: "min(520px, calc(100vh - 140px))",
              background: "var(--bg-soft)",
              border: "1px solid rgba(17,138,178,0.25)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(17,138,178,0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-5 py-4 flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, var(--blue-1) 0%, var(--blue-2) 100%)",
                borderBottom: "1px solid rgba(17,138,178,0.3)",
              }}
            >
              {/* Avatar */}
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 relative"
                style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }}
              >
                <IconBot />
                <motion.div
                  className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full"
                  style={{ background: "#22c55e", border: "2px solid var(--blue-1)" }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-white font-semibold text-sm tracking-wide">AI Assistant</p>
                  <div
                    className="flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase"
                    style={{ background: "rgba(255,143,171,0.2)", color: "var(--accent-pink)" }}
                  >
                    <IconSparkle /> Pro
                  </div>
                </div>
                <p className="text-white/50 text-xs mt-0.5">Online • Replies instantly</p>
              </div>

              <button
                onClick={() => setChatOpen(false)}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white/60 hover:text-white hover:bg-white/15 transition-all duration-200"
              >
                <IconClose />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin"
              style={{ scrollbarColor: "var(--blue-1) transparent" }}
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  variants={msgVariants}
                  initial="hidden"
                  animate="visible"
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mr-2 mt-1 text-white"
                      style={{ background: "var(--blue-2)", minWidth: "24px" }}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                        <path d="M16.5 7.5h-9v9h9v-9z" /><path fillRule="evenodd" d="M8.25 2.25A.75.75 0 019 3v.75h2.25V3a.75.75 0 011.5 0v.75H15V3a.75.75 0 011.5 0v.75h.75a3 3 0 013 3v.75H21A.75.75 0 0121 9h-.75v2.25H21a.75.75 0 010 1.5h-.75V15H21a.75.75 0 010 1.5h-.75v.75a3 3 0 01-3 3h-.75V21a.75.75 0 01-1.5 0v-.75h-2.25V21a.75.75 0 01-1.5 0v-.75H9V21a.75.75 0 01-1.5 0v-.75h-.75a3 3 0 01-3-3v-.75H3A.75.75 0 013 15h.75v-2.25H3a.75.75 0 010-1.5h.75V9H3a.75.75 0 010-1.5h.75v-.75a3 3 0 013-3h.75V3a.75.75 0 01.75-.75zM6 6.75A.75.75 0 016.75 6h10.5a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V6.75z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "rounded-tr-sm text-white"
                        : "rounded-tl-sm text-white/90"
                    }`}
                    style={
                      msg.role === "user"
                        ? {
                            background: "linear-gradient(135deg, var(--blue-2), var(--blue-3))",
                            boxShadow: "0 2px 12px rgba(0,80,157,0.3)",
                          }
                        : {
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(17,138,178,0.2)",
                          }
                    }
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <motion.div
                  variants={msgVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex justify-start"
                >
                  <div
                    className="rounded-2xl rounded-tl-sm"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(17,138,178,0.2)",
                    }}
                  >
                    <TypingDots />
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions (only at start) */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {["Features kya hain?", "Contact karo", "Pricing batao"].map((s) => (
                  <button
                    key={s}
                    onClick={() => { setInput(s); setTimeout(handleSend, 50); }}
                    className="text-xs px-3 py-1.5 rounded-full transition-all duration-200 hover:scale-105"
                    style={{
                      border: "1px solid rgba(17,138,178,0.35)",
                      background: "rgba(0,80,157,0.15)",
                      color: "var(--blue-3)",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div
              className="px-4 pb-4 pt-3 flex-shrink-0"
              style={{ borderTop: "1px solid rgba(17,138,178,0.15)" }}
            >
              <div
                className="flex items-end gap-2 rounded-2xl px-4 py-3"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(17,138,178,0.25)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
                }}
              >
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Kuch poochho..."
                  rows={1}
                  className="flex-1 bg-transparent text-sm text-white/90 placeholder-white/25 resize-none outline-none leading-relaxed"
                  style={{ maxHeight: "80px", overflowY: "auto" }}
                />
                <motion.button
                  whileTap={{ scale: 0.88 }}
                  whileHover={{ scale: 1.08 }}
                  onClick={handleSend}
                  disabled={!input.trim() || loading}
                  className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 disabled:opacity-30 transition-all duration-200"
                  style={{
                    background: input.trim()
                      ? "linear-gradient(135deg, var(--blue-2), var(--blue-3))"
                      : "rgba(255,255,255,0.08)",
                    color: "white",
                    boxShadow: input.trim() ? "0 2px 12px rgba(0,80,157,0.4)" : "none",
                  }}
                >
                  <IconSend />
                </motion.button>
              </div>
              <p className="text-center text-white/15 text-[10px] mt-2 tracking-wide">
                Powered by Claude AI
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FAB Button ────────────────────────────────────────────────────── */}
      <motion.button
        onClick={chatOpen ? () => setChatOpen(false) : handleOpen}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-2xl"
        style={{
          background: chatOpen
            ? "linear-gradient(135deg, var(--blue-1), var(--bg-soft))"
            : "linear-gradient(135deg, var(--blue-2), var(--blue-3))",
          boxShadow: "0 8px 32px rgba(0,80,157,0.5), 0 0 0 1px rgba(17,138,178,0.3)",
          transition: "background 0.3s ease",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
      >
        <AnimatePresence mode="wait">
          {chatOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <IconClose />
            </motion.span>
          ) : (
            <motion.span
              key="bot"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <IconBot />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Pulse ring (only when closed & not interacted) */}
        {!chatOpen && !hasInteracted && (
          <motion.span
            className="absolute inset-0 rounded-2xl"
            style={{ border: "2px solid var(--blue-3)" }}
            animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </motion.button>
    </>
  );
}