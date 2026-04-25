"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, Send, X, Loader2, Minus, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatWidgetProps {
  standalone?: boolean;
}

const STARTER_QUESTIONS = [
  "What services do you offer?",
  "How do I book an appointment?",
  "What conditions do you treat?",
  "Where are you located?",
];

export default function ChatWidget({ standalone = false }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(standalone ? true : false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState("");
  const [displayMessage, setDisplayMessage] = useState("");
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll logic
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages, displayMessage, isLoading]);

  // Human-like typing effect
  useEffect(() => {
    if (streamingMessage && displayMessage.length < streamingMessage.length) {
      const timeout = setTimeout(() => {
        setDisplayMessage(streamingMessage.slice(0, displayMessage.length + 1));
      }, 5); // 5ms per character
      return () => clearTimeout(timeout);
    }
    
    // Finalize when typing catches up and streaming is done
    if (streamingMessage && displayMessage.length === streamingMessage.length && !isLoading) {
      setMessages((prev) => [...prev, { role: "assistant", content: streamingMessage }]);
      setStreamingMessage("");
      setDisplayMessage("");
    }
  }, [streamingMessage, displayMessage, isLoading]);

  const handleSend = async (text: string) => {
    const messageText = text || input;
    if (!messageText.trim() || isLoading) return;

    setMessages((prev) => [...prev, { role: "user", content: messageText }]);
    setInput("");
    setIsLoading(true);
    setStreamingMessage("");
    setDisplayMessage("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageText,
          history: messages.slice(-10),
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch");

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader");

      let fullContent = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        fullContent += chunk;
        setStreamingMessage(fullContent);
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I'm having trouble right now. Please call (214) 888-6769." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="bg-[#0a0a0a] p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                    <MessageCircle size={20} className="text-white" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0a0a0a]" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">The Sports Pod</h3>
                  <p className="text-[10px] text-gray-400">Online • Ask Us Anything</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setIsMinimized(true)} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
                  <Minus size={18} />
                </button>
                <button onClick={toggleChat} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50/50">
              {messages.length === 0 && (
                <div className="space-y-4 py-4">
                  <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Hi there! Welcome to **The Sports Pod**. I'm your recovery assistant. How can I help you today?
                    </p>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {STARTER_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        onClick={() => handleSend(q)}
                        className="text-left p-3 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:border-black hover:bg-black hover:text-white transition-all duration-200 shadow-sm"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex flex-col w-full",
                    msg.role === "user" ? "items-end" : "items-start"
                  )}
                >
                  <div
                    className={cn(
                      "p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap max-w-[85%] sm:max-w-[80%]",
                      msg.role === "user"
                        ? "bg-[#0a0a0a] text-white rounded-tr-none"
                        : "bg-white text-gray-800 border border-gray-200 rounded-tl-none shadow-sm"
                    )}
                  >
                    {msg.content}
                    
                    {/* Action Buttons for Bot Messages */}
                    {msg.role === "assistant" && (
                      <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100">
                        {(msg.content.includes("airtable.com") || msg.content.includes("book")) && (
                          <a
                            href="https://airtable.com/appofhO24o8DXcD75/pagrE6jeIGbrwnYCO/form"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0a0a0a] text-white text-[11px] font-bold rounded-full hover:bg-gray-800 transition-colors"
                          >
                            <Maximize2 size={12} />
                            Book Appointment
                          </a>
                        )}
                        {(msg.content.includes("888-6769") || msg.content.includes("call")) && (
                          <a
                            href="tel:2148886769"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-black text-[11px] font-bold rounded-full hover:bg-gray-200 transition-colors border border-gray-200"
                          >
                            <MessageCircle size={12} />
                            Call Clinic
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {displayMessage && (
                <div className="flex flex-col items-start w-full">
                  <div className="p-3 bg-white text-gray-800 border border-gray-200 rounded-2xl rounded-tl-none shadow-sm text-sm leading-relaxed whitespace-pre-wrap max-w-[85%] sm:max-w-[80%]">
                    {displayMessage}

                    {/* Action Buttons for Streaming Message */}
                    <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100 opacity-50">
                      {(displayMessage.includes("airtable.com") || displayMessage.includes("book")) && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0a0a0a] text-white text-[11px] font-bold rounded-full">
                          <Maximize2 size={12} />
                          Book Appointment
                        </div>
                      )}
                      {(displayMessage.includes("888-6769") || displayMessage.includes("call")) && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-black text-[11px] font-bold rounded-full border border-gray-200">
                          <MessageCircle size={12} />
                          Call Clinic
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {isLoading && !displayMessage && (
                <div className="flex items-center gap-2 text-gray-400 p-2">
                  <div className="flex gap-1">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                      className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                      className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                      className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend("");
                }}
                className="relative flex items-center"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="w-full bg-gray-100 border-none rounded-xl py-3 pl-4 pr-12 text-sm focus:ring-2 focus:ring-black transition-all text-black"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 p-2 text-gray-400 hover:text-black disabled:opacity-50 transition-colors"
                >
                  {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                </button>
              </form>
              <div className="mt-2 text-center">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                  Powered by The Sports Pod AI
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!standalone && (
        <>
          {isMinimized && isOpen ? (
            <motion.div
              layoutId="chat-button"
              onClick={() => setIsMinimized(false)}
              className="bg-[#0a0a0a] text-white p-3 rounded-xl shadow-xl flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform"
            >
              <MessageCircle size={20} />
              <span className="text-sm font-bold">Chat with Us</span>
              <Maximize2 size={16} className="text-gray-400" />
            </motion.div>
          ) : (
            <motion.button
              layoutId="chat-button"
              onClick={toggleChat}
              className={cn(
                "w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95",
                isOpen ? "bg-white text-black border border-gray-200" : "bg-[#0a0a0a] text-white"
              )}
            >
              {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
            </motion.button>
          )}
        </>
      )}
    </div>
  );
}
