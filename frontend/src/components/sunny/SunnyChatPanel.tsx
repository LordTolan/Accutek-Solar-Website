"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { X, Send, Sparkles, MessageCircle, ArrowRight, RefreshCcw, ShieldCheck, Sun } from "lucide-react";
import SunnySun from "./SunnySun";
import { api } from "@/lib/api";

interface SunnyMessage {
  id: string;
  sender: "sunny" | "user";
  text: string;
  suggested_links?: Array<{ label: string; url: string }>;
  source?: string;
  time?: string;
}

interface SunnyChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  reducedMotion?: boolean;
}

const DEFAULT_SUGGESTIONS = [
  "How much does solar cost?",
  "Roof vs Ground Mount solar?",
  "Do you install Kohler generators?",
  "What counties do you serve?",
];

export default function SunnyChatPanel({
  isOpen,
  onClose,
  reducedMotion = false,
}: SunnyChatPanelProps) {
  const [messages, setMessages] = useState<SunnyMessage[]>([
    {
      id: "welcome",
      sender: "sunny",
      text: "Hi! I'm Sunny from Accutek Solar. How can I help power your home or business today?",
      suggested_links: [
        {"label": "Get a Free Estimate", "url": "/quote"},
        {"label": "Solar Savings Calculator", "url": "/tools/calculator"},
      ],
      time: "Just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [quickFaqs, setQuickFaqs] = useState<Array<{ id: string; question: string }>>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  }, [messages, loading, reducedMotion]);

  // Focus trap / auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Load quick FAQs on mount
  useEffect(() => {
    api
      .getSunnyFaqs()
      .then((res) => {
        if (res.faqs && res.faqs.length > 0) {
          setQuickFaqs(res.faqs.slice(0, 4));
        }
      })
      .catch(() => {
        // Fallback to defaults
      });
  }, []);

  async function handleSend(textToSend?: string) {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMsg: SunnyMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      time: "Now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // Build history for context (exclude welcoming greeting)
      const historyPayload = messages
        .filter((m) => m.id !== "welcome")
        .map((m) => ({
          role: m.sender === "sunny" ? "assistant" : "user",
          sender: m.sender,
          text: m.text,
        }));

      const res = await api.chatWithSunny(query, historyPayload);

      const botMsg: SunnyMessage = {
        id: `sunny-${Date.now()}`,
        sender: "sunny",
        text: res.reply,
        suggested_links: res.suggested_links,
        source: res.source,
        time: "Just now",
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      const errorMsg: SunnyMessage = {
        id: `sunny-err-${Date.now()}`,
        sender: "sunny",
        text: "I'm having a little trouble connecting right now, but Keith and Seth at Accutek Solar are always happy to answer your questions!",
        suggested_links: [
          { label: "Get a Free Quote", url: "/quote" },
          { label: "Call (812) 878-7343", url: "/contact" },
        ],
        time: "Just now",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }

  if (!isOpen) return null;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Chat with Sunny from Accutek Solar"
      tabIndex={-1}
      className={`
        fixed z-50 pointer-events-auto shadow-2xl flex flex-col bg-card border border-border overflow-hidden
        /* Mobile: Bottom Sheet */
        inset-x-0 bottom-0 h-[85vh] max-h-[640px] rounded-t-2xl
        /* Desktop: Drawer parked bottom-right */
        md:inset-x-auto md:right-6 md:bottom-24 md:w-[400px] md:h-[580px] md:rounded-2xl
        transition-all duration-300
      `}
      data-testid="sunny-chat-panel"
    >
      {/* Panel Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-secondary to-primary p-4 text-white flex items-center justify-between border-b border-primary/20 shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <SunnySun size={36} reducedMotion={reducedMotion} isOpen={true} />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-accent rounded-full ring-2 ring-emerald-950 animate-pulse" />
          </div>
          <div>
            <div className="font-heading font-extrabold text-base flex items-center gap-1.5">
              Sunny <span className="text-[10px] uppercase font-mono tracking-wider bg-white/20 px-1.5 py-0.5 rounded text-white/90">Accutek AI</span>
            </div>
            <div className="text-xs text-white/80 flex items-center gap-1 font-medium">
              <span>Fast solar &amp; backup answers</span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          aria-label="Close Chat"
          className="p-1.5 rounded-full hover:bg-white/20 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          data-testid="sunny-close-button"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Trust & Grounding Pill */}
      <div className="bg-muted/80 px-4 py-2 text-[11px] text-muted-foreground border-b border-border flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-primary shrink-0" />
          <span>Accutek Solar · 32 yrs · 17 IN/IL Counties</span>
        </div>
        <button
          onClick={() => {
            setMessages([
              {
                id: "welcome-reset",
                sender: "sunny",
                text: "Chat cleared! How can I help you with solar or backup power today?",
                suggested_links: [
                  { label: "Get a Free Quote", url: "/quote" },
                  { label: "Solar Savings Calculator", url: "/tools/calculator" },
                ],
                time: "Just now",
              },
            ]);
          }}
          className="hover:text-foreground inline-flex items-center gap-1 text-[10px] font-mono uppercase"
          title="Clear chat"
        >
          <RefreshCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 text-sm" data-testid="sunny-messages-list">
        {messages.map((m) => {
          const isSunny = m.sender === "sunny";
          return (
            <div
              key={m.id}
              className={`flex flex-col ${isSunny ? "items-start" : "items-end"}`}
              data-testid={`chat-message-${m.id}`}
            >
              <div className="flex items-start gap-2 max-w-[85%]">
                {isSunny && (
                  <div className="mt-1 shrink-0">
                    <SunnySun size={24} reducedMotion={true} />
                  </div>
                )}
                <div
                  className={`p-3.5 rounded-2xl leading-relaxed ${
                    isSunny
                      ? "bg-muted/70 text-foreground rounded-tl-sm border border-border"
                      : "bg-primary text-primary-foreground rounded-tr-sm shadow-sm"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>

                  {/* Render Suggested Action Buttons/Links */}
                  {isSunny && m.suggested_links && m.suggested_links.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-border/60 flex flex-wrap gap-1.5">
                      {m.suggested_links.map((link, idx) => (
                        <Link
                          key={idx}
                          href={link.url}
                          onClick={() => {
                            // Leave panel open or allow smooth navigation
                          }}
                          className="inline-flex items-center gap-1 text-xs font-bold bg-card border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground px-2.5 py-1.5 rounded-md transition shadow-xs focus-ring"
                          data-testid={`sunny-link-${idx}`}
                        >
                          {link.label}
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {loading && (
          <div className="flex items-start gap-2 max-w-[80%]">
            <div className="mt-1 shrink-0">
              <SunnySun size={24} reducedMotion={reducedMotion} isHovered={true} />
            </div>
            <div className="p-3.5 rounded-2xl bg-muted/70 border border-border rounded-tl-sm text-muted-foreground flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.4s]" />
              <span className="text-xs ml-1 font-mono">Sunny is thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Questions if only 1 message */}
      {messages.length <= 2 && (
        <div className="px-4 py-2 border-t border-border bg-card/50 flex flex-col gap-1.5 shrink-0">
          <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" /> Popular Questions:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(quickFaqs.length > 0 ? quickFaqs.map((f) => f.question) : DEFAULT_SUGGESTIONS).map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                disabled={loading}
                className="text-left text-xs bg-muted hover:bg-muted/80 text-foreground/80 hover:text-foreground px-2.5 py-1 rounded-full border border-border transition"
                data-testid={`quick-faq-${idx}`}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 border-t border-border bg-card flex items-center gap-2 shrink-0"
        data-testid="sunny-input-form"
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Sunny a solar question..."
          disabled={loading}
          className="flex-1 bg-muted/60 border border-input rounded-full px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          data-testid="sunny-input-field"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          aria-label="Send Message"
          className="p-2.5 rounded-full bg-primary text-primary-foreground disabled:opacity-40 hover:shadow-green-glow transition focus-ring shrink-0"
          data-testid="sunny-send-button"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
