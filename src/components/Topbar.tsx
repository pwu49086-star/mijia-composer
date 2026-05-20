"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { SCENES } from "@/data/scenes";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export function Topbar({ onExport }: { onExport: () => void }) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="relative z-10 flex h-14 shrink-0 items-center justify-between border-b border-border bg-card px-5"
    >
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent" />

      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent)] text-xs font-extrabold text-white shadow-[var(--shadow-glow)]">
          Mi
        </div>
        <span className="text-sm font-bold tracking-tight">米家搭配向导</span>
        <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
          v1.0
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="gap-1.5 text-[10px]">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.4)]" />
          <span className="font-mono font-semibold">13,918</span> 设备库
        </Badge>
        <Badge variant="secondary" className="gap-1 text-[10px]">
          <span className="font-mono font-semibold">{SCENES.length}</span> 场景
        </Badge>
        <Badge variant="secondary" className="gap-1 text-[10px]">
          <span className="font-mono font-semibold">4</span> 协议
        </Badge>
        <Button size="sm" className="ml-1 h-8 gap-1.5 bg-[var(--accent)] text-xs shadow-md shadow-primary/20 hover:opacity-90" onClick={onExport}>
          查看方案
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </motion.header>
  );
}
