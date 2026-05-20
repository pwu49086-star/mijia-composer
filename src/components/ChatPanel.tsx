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

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span key={i} className="h-1.5 w-1.5 rounded-full bg-orange-500/60"
          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0.15, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export function ChatPanel({ messages, onSend, isTyping, aiMode, apiKey, onApiKeyChange }: Props) {
  const [input, setInput] = useState("");
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [keyDraft, setKeyDraft] = useState(apiKey);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => { setKeyDraft(apiKey); }, [apiKey]);
  useEffect(() => { if (ref.current) ref.current.scrollTop = ref.current.scrollHeight; }, [messages, isTyping]);

  const handleSend = () => { if (!input.trim()) return; onSend(input); setInput(""); };
  const handleSaveKey = () => { const t = keyDraft.trim(); onApiKeyChange(t); if (t) setShowKeyInput(false); };
  const handleClearKey = () => { setKeyDraft(""); onApiKeyChange(""); setShowKeyInput(false); };

  return (
    <motion.aside
      initial={{ x: 16, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.08 }}
      className="flex w-80 shrink-0 flex-col border-l border-border bg-card"
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-border px-4 py-3">
        <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg shadow-md",
          aiMode === "claude" ? "bg-purple-100 shadow-purple-200/20" : "bg-orange-50"
        )}>
          {aiMode === "claude" ? <Sparkles className="h-4 w-4 text-purple-500" /> : <MessageSquare className="h-4 w-4 text-orange-500" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold">米家助手</div>
          <div className="flex items-center gap-1.5 text-[9px] font-medium">
            {aiMode === "claude" ? (
              <><span className="h-1.5 w-1.5 rounded-full bg-purple-500 shadow-[0_0_4px_rgba(168,85,247,0.4)]" /><span className="text-purple-500">AI: Claude</span></>
            ) : (
              <><span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_4px_rgba(52,211,153,0.4)]" /><span className="text-emerald-600">AI: 规则引擎</span></>
            )}
          </div>
        </div>
        <button onClick={() => setShowKeyInput(!showKeyInput)}
          className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-all",
            showKeyInput ? "bg-purple-50 text-purple-500" : "text-muted-foreground/40 hover:text-muted-foreground hover:bg-muted"
          )}
          title="API 设置"><Settings className="h-3.5 w-3.5" /></button>
      </div>

      {/* API Key Panel */}
      <AnimatePresence>
        {showKeyInput && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
            className="overflow-hidden border-b border-border">
            <div className="px-4 py-3 space-y-2">
              <div className="flex items-center gap-1.5"><Brain className="h-3 w-3 text-purple-500" /><span className="text-[10px] font-semibold text-muted-foreground">Anthropic API Key</span></div>
              <div className="flex gap-1.5">
                <Input type="password" value={keyDraft} onChange={(e) => setKeyDraft(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSaveKey()}
                  placeholder="sk-ant-api03-..." className="h-7 flex-1 rounded-md border-border bg-muted text-[10px] placeholder:text-muted-foreground/30 focus-visible:ring-purple-500/20" />
                <button onClick={handleSaveKey} className="flex h-7 items-center rounded-md bg-purple-50 px-2.5 text-[10px] font-medium text-purple-500 hover:bg-purple-100 active:scale-95">保存</button>
                {apiKey && <button onClick={handleClearKey} className="flex h-7 w-7 items-center justify-center rounded-md bg-red-50 text-red-500 hover:bg-red-100 active:scale-95" title="清除"><X className="h-3 w-3" /></button>}
              </div>
              <p className="text-[8px] text-muted-foreground/40">Key 仅存 sessionStorage，关闭浏览器自动清除，不上传服务器。</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages */}
      <ScrollArea className="flex-1 px-3 py-3" ref={ref}>
        <div className="flex flex-col gap-2">
          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                className={cn("max-w-[90%] rounded-xl px-3.5 py-2.5 text-xs leading-relaxed",
                  m.role === "ai"
                    ? "self-start rounded-bl-sm border border-border bg-muted text-foreground/80"
                    : "self-end rounded-br-sm border border-orange-100 bg-orange-50 text-orange-500"
                )}
              >
                <div className="whitespace-pre-wrap">{m.text}</div>
                {m.tag && (
                  <span className={cn("mt-1 inline-block rounded px-1.5 py-0.5 text-[9px] font-semibold",
                    m.tagClass === "tag-ok" && "bg-emerald-50 text-emerald-600",
                    m.tagClass === "tag-tip" && "bg-amber-50 text-amber-600",
                    m.tagClass === "tag-info" && "bg-sky-50 text-sky-600"
                  )}>{m.tag}</span>
                )}
              </motion.div>
            ))}
            {isTyping && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="self-start rounded-xl rounded-bl-sm border border-border bg-muted px-3 py-2"><TypingDots /></motion.div>
            )}
          </AnimatePresence>
        </div>
      </ScrollArea>

      {/* Quick */}
      <div className="flex flex-wrap gap-1.5 px-3 pb-2">
        {QUICK.map((q) => (
          <button key={q} onClick={() => onSend(q)}
            className="rounded-md border border-border bg-muted px-3 py-1.5 text-[10px] font-medium text-muted-foreground transition-all hover:border-orange-200 hover:text-orange-500"
          >{q}</button>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-border px-3 py-3">
        <div className="flex gap-2">
          <Input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder={aiMode === "claude" ? "问 Claude..." : "问我任何问题..."}
            className="h-9 flex-1 rounded-lg border-border bg-muted text-xs placeholder:text-muted-foreground/30 focus-visible:ring-[var(--accent)]/20" />
          <button onClick={handleSend} disabled={isTyping}
            className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white shadow-md transition-all hover:shadow-lg active:scale-95",
              isTyping ? "bg-muted opacity-50 cursor-not-allowed" : "bg-orange-500 shadow-orange-200 hover:shadow-orange-300"
            )}><Send className="h-4 w-4" /></button>
        </div>
      </div>
    </motion.aside>
  );
}
