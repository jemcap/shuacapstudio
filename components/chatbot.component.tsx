"use client";
import { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(true);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: [...messages, newMessage] }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const botMessage = { role: "assistant", content: data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred while fetching the response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Minimized Chat Button */}
      {!open && (
        <button
          aria-label="Open chat"
          onClick={() => setOpen(true)}
          className="flex items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all"
        >
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
            <path
              d="M12 3C6.48 3 2 6.92 2 12c0 2.08.8 3.97 2.13 5.47L2 21l3.66-1.1C7.44 20.6 9.66 21 12 21c5.52 0 10-3.92 10-9s-4.48-9-10-9z"
              fill="currentColor"
            />
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="w-[95vw] max-w-md h-[50vh] bg-white shadow-2xl rounded-xl flex flex-col transition-all duration-300">
          {/* Header */}
          <div className="flex items-center justify-end px-4 py-3 border-b rounded-t-xl bg-blue-600">

            <button
              aria-label="Minimize chat"
              onClick={() => setOpen(false)}
              className="text-white hover:text-blue-200 transition"
            >
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                <path
                  d="M18.3 5.71a1 1 0 00-1.41 0L12 10.59 7.11 5.7A1 1 0 105.7 7.11L10.59 12l-4.89 4.89a1 1 0 101.41 1.41L12 13.41l4.89 4.89a1 1 0 001.41-1.41L13.41 12l4.89-4.89a1 1 0 000-1.4z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-2 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <span
                  className={`inline-block px-3 py-2 rounded-lg max-w-[80%] break-words ${
                    msg.role === "user"
                      ? "bg-blue-100 text-blue-900"
                      : "bg-gray-200 text-gray-900"
                  }`}
                  style={{ whiteSpace: "pre-line" }}
                >
                  {msg.content}
                </span>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <span className="inline-block px-3 py-2 rounded-lg bg-gray-200 text-gray-900 mb-2">
                  …
                </span>
              </div>
            )}
            {error && (
              <div className="text-red-500 text-sm mt-2">{error}</div>
            )}
          </div>
          {/* Input */}
          <div className="flex p-3 border-t bg-white rounded-b-xl">
            <input
              className="flex-1 border rounded px-2 py-1 mr-2 focus:outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask which service is best for you…"
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Sending…" : "Send"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;