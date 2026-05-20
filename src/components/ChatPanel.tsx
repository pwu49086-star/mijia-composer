"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageSquare, Settings, X, Sparkles, Brain } from "lucide-react";
import type { ChatMessage } from "@/data/icons";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Props {
  messages: ChatMessage[];
  onSend: (text: string) => void;
  isTyping: boolean;
  aiMode: "rules" | "claude";
  apiKey: string;
  onApiKeyChange: (key: string) => void;
}

const QUICK = ["预算多少", "推荐什么", "怎么安装", "能联动吗"];

/** 3 bouncing dots typing indicator */
function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-foreground/40"
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatDelay: 0.15,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function ChatPanel({
  messages,
  onSend,
  isTyping,
  aiMode,
  apiKey,
  onApiKeyChange,
}: Props) {
  const [input, setInput] = useState("");
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [keyDraft, setKeyDraft] = useState(apiKey);
  const ref = useRef<HTMLDivElement>(null);

  // sync draft when apiKey changes externally (e.g. initial load)
  useEffect(() => {
    setKeyDraft(apiKey);
  }, [apiKey]);

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  const handleSaveKey = () => {
    const trimmed = keyDraft.trim();
    onApiKeyChange(trimmed);
    if (trimmed) {
      setShowKeyInput(false);
    }
  };

  const handleClearKey = () => {
    setKeyDraft("");
    onApiKeyChange("");
    setShowKeyInput(false);
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
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] shadow-md shadow-primary/25">
          {aiMode === "claude" ? (
            <Sparkles className="h-4 w-4 text-white" />
          ) : (
            <MessageSquare className="h-4 w-4 text-white" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold">米家助手</div>
          <div className="flex items-center gap-1.5 text-[9px] font-medium">
            {aiMode === "claude" ? (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-purple-500 shadow-[0_0_4px_rgba(168,85,247,0.4)]" />
                <span className="text-purple-500">AI: Claude</span>
              </>
            ) : (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_4px_rgba(34,197,94,0.4)]" />
                <span className="text-green-500">AI: 规则引擎</span>
              </>
            )}
          </div>
        </div>

        {/* Settings gear button */}
        <button
          onClick={() => setShowKeyInput(!showKeyInput)}
          className={cn(
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-all",
            showKeyInput
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground/50 hover:text-muted-foreground hover:bg-muted/50"
          )}
          title="API 设置"
        >
          <Settings className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Collapsible API Key section */}
      <AnimatePresence>
        {showKeyInput && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-b border-border"
          >
            <div className="px-4 py-3 space-y-2">
              <div className="flex items-center gap-1.5">
                <Brain className="h-3 w-3 text-purple-500" />
                <span className="text-[10px] font-semibold text-muted-foreground">
                  Anthropic API Key
                </span>
              </div>
              <div className="flex gap-1.5">
                <Input
                  type="password"
                  value={keyDraft}
                  onChange={(e) => setKeyDraft(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSaveKey()}
                  placeholder="sk-ant-api03-..."
                  className="h-7 flex-1 rounded-md border-border bg-muted/40 text-[10px] placeholder:text-muted-foreground/40 focus-visible:ring-purple-500/20"
                />
                <button
                  onClick={handleSaveKey}
                  className="flex h-7 items-center rounded-md bg-purple-500/10 px-2.5 text-[10px] font-medium text-purple-600 transition-all hover:bg-purple-500/20 active:scale-95"
                >
                  保存
                </button>
                {apiKey && (
                  <button
                    onClick={handleClearKey}
                    className="flex h-7 w-7 items-center justify-center rounded-md bg-red-500/10 text-red-500 transition-all hover:bg-red-500/20 active:scale-95"
                    title="清除Key"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
              <p className="text-[8px] text-muted-foreground/50 leading-relaxed">
                Key 仅存储在浏览器 sessionStorage，不会上传到任何服务器。
                关闭浏览器后自动清除。
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
                    : "self-end rounded-br-sm border border-primary/10 bg-primary/10 text-primary"
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

            {/* Typing indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="self-start rounded-xl rounded-bl-sm border border-border bg-muted/60 px-3 py-2"
                >
                  <TypingDots />
                </motion.div>
              )}
            </AnimatePresence>
          </AnimatePresence>
        </div>
      </ScrollArea>

      {/* Quick buttons */}
      <div className="flex flex-wrap gap-1.5 px-3 pb-2">
        {QUICK.map((q) => (
          <button
            key={q}
            onClick={() => onSend(q)}
            className="rounded-md border border-border bg-muted/60 px-3 py-1.5 text-[10px] font-medium text-muted-foreground transition-all hover:border-primary/30 hover:text-primary"
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
            placeholder={
              aiMode === "claude" ? "问 Claude 任何问题..." : "问我任何问题..."
            }
            className="h-9 flex-1 rounded-lg border-border bg-muted/40 text-xs placeholder:text-muted-foreground/50 focus-visible:ring-primary/20"
          />
          <button
            onClick={handleSend}
            disabled={isTyping}
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] text-white shadow-md shadow-primary/25 transition-all hover:shadow-lg hover:shadow-primary/35 active:scale-95",
              isTyping && "opacity-50 cursor-not-allowed"
            )}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.aside>
  );
}
