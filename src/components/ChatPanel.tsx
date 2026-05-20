"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageSquare } from "lucide-react";
import type { ChatMessage } from "@/data/icons";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Props {
  messages: ChatMessage[];
  onSend: (text: string) => void;
}

const QUICK = ["预算多少", "推荐什么", "怎么安装", "能联动吗"];

export function ChatPanel({ messages, onSend }: Props) {
  const [input, setInput] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <motion.aside
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.1 }}
      className="flex w-80 shrink-0 flex-col border-l border-border bg-card"
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-border px-4 py-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 shadow-md shadow-indigo-500/25">
          <MessageSquare className="h-4 w-4 text-white" />
        </div>
        <div>
          <div className="text-sm font-semibold">米家助手</div>
          <div className="flex items-center gap-1 text-[9px] font-medium text-green-500">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_4px_rgba(34,197,94,0.4)]" />
            在线
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 px-3 py-3" ref={ref}>
        <div className="flex flex-col gap-2">
          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                className={cn(
                  "max-w-[90%] rounded-xl px-3.5 py-2.5 text-xs leading-relaxed",
                  m.role === "ai"
                    ? "self-start rounded-bl-sm border border-border bg-muted/60 text-foreground/80"
                    : "self-end rounded-br-sm border border-indigo-500/10 bg-indigo-500/[0.06] text-indigo-600"
                )}
              >
                <div className="whitespace-pre-wrap">{m.text}</div>
                {m.tag && (
                  <span
                    className={cn(
                      "mt-1 inline-block rounded px-1.5 py-0.5 text-[9px] font-semibold",
                      m.tagClass === "tag-ok" && "bg-green-500/10 text-green-600",
                      m.tagClass === "tag-tip" && "bg-amber-500/10 text-amber-600",
                      m.tagClass === "tag-info" && "bg-blue-500/10 text-blue-600"
                    )}
                  >
                    {m.tag}
                  </span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </ScrollArea>

      {/* Quick buttons */}
      <div className="flex flex-wrap gap-1.5 px-3 pb-2">
        {QUICK.map((q) => (
          <button
            key={q}
            onClick={() => onSend(q)}
            className="rounded-md border border-border bg-muted/60 px-3 py-1.5 text-[10px] font-medium text-muted-foreground transition-all hover:border-indigo-500/30 hover:text-indigo-500"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-border px-3 py-3">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="问我任何问题..."
            className="h-9 flex-1 rounded-lg border-border bg-muted/40 text-xs placeholder:text-muted-foreground/50 focus-visible:ring-indigo-500/20"
          />
          <button
            onClick={handleSend}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-md shadow-indigo-500/25 transition-all hover:shadow-lg hover:shadow-indigo-500/35 active:scale-95"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.aside>
  );
}
