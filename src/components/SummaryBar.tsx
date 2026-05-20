"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileText, Trash2, ArrowRight } from "lucide-react";

interface Props {
  totalDevices: number; totalPrice: number; sceneCount: number;
  onBreakdown: () => void; onClear: () => void; onExport: () => void;
}

export function SummaryBar({ totalDevices, totalPrice, sceneCount, onBreakdown, onClear, onExport }: Props) {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.2 }}
      className="flex shrink-0 items-center justify-between border-t border-border bg-card px-4 py-2.5"
    >
      <div className="flex gap-5">
        <Stat value={totalDevices} label="设备" />
        <Stat value={`¥${totalPrice}`} label="总价" glow />
        <Stat value={sceneCount} label="场景" />
      </div>
      <div className="flex items-center gap-2">
        <Button size="sm" variant="outline" className="h-8 gap-1.5 text-[11px] border-border bg-muted text-muted-foreground hover:border-border hover:text-foreground" onClick={onBreakdown}>
          <FileText className="h-3.5 w-3.5" />明细</Button>
        <Button size="sm" variant="outline" className="h-8 gap-1.5 text-[11px] border-border bg-muted text-muted-foreground hover:border-red-500/20 hover:text-red-400" onClick={onClear}>
          <Trash2 className="h-3.5 w-3.5" />清空</Button>
        <Button size="sm" className="h-8 gap-1.5 bg-[var(--accent)] text-xs shadow-md shadow-[var(--accent)]/30 hover:shadow-[var(--accent)]/50" onClick={onExport}>
          查看方案<ArrowRight className="h-3.5 w-3.5" /></Button>
      </div>
    </motion.div>
  );
}

function Stat({ value, label, glow }: { value: string | number; label: string; glow?: boolean }) {
  return (
    <div className="relative text-center">
      <div className={glow ? "font-mono text-lg font-bold num-glow text-[var(--accent)]" : "font-mono text-lg font-bold"}>{value}</div>
      <div className="mt-0.5 text-[9px] uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}
