"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { SCENES, FAMILY_OPTS, RENO_OPTS } from "@/data/scenes";
import { SceneIconMap } from "@/data/icons";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  sel: string[];
  tog: (id: string) => void;
  selAll: () => void;
  family: string[];
  toggleFamily: (v: string) => void;
  reno: string;
  setReno: (v: string) => void;
  getScenePrice: (id: string) => number;
}

export function ScenePanel({ sel, tog, selAll, family, toggleFamily, reno, setReno, getScenePrice }: Props) {
  const allSelected = sel.length === SCENES.length;

  return (
    <motion.aside
      initial={{ x: -16, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 280, damping: 28, delay: 0.03 }}
      className="flex w-72 shrink-0 flex-col border-r border-border bg-card"
    >
      <div className="border-b border-border px-4 py-3 flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">场景配置</span>
        <button
          type="button" onClick={selAll}
          className={cn(
            "text-[10px] font-medium transition-all px-2 py-0.5 rounded-md",
            allSelected ? "bg-orange-50 text-orange-500" : "text-muted-foreground hover:text-orange-500"
          )}
        >
          {allSelected ? "已全选" : "全选"}
        </button>
      </div>

      <ScrollArea className="flex-1 px-3 py-2">
        <div className="mb-2">
          <div className="mb-1.5 flex items-center gap-1.5 px-1">
            <span className="h-2.5 w-0.5 rounded-full bg-[#ff6700]/50" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">选择场景</span>
          </div>

          <div className="flex flex-col gap-0.5">
            {SCENES.map((s, idx) => {
              const active = sel.includes(s.id);
              const Icon = SceneIconMap[s.icon];
              return (
                <motion.button
                  key={s.id} onClick={() => tog(s.id)}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.02, duration: 0.18 }}
                  className={cn(
                    "group flex items-center gap-2.5 rounded-xl border px-2.5 py-2 text-left transition-all duration-300",
                    active
                      ? "border-[var(--accent)]/20 bg-orange-50 "
                      : "border-transparent hover:border-border hover:bg-muted"
                  )}
                >
                  <div className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-all",
                    active ? "border-[var(--accent)]/20 bg-orange-50" : "border-border bg-muted"
                  )}>
                    {Icon && <Icon className={cn("h-3.5 w-3.5", active ? "text-orange-500" : "text-muted-foreground")} />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className={cn("text-[11px] font-semibold", active ? "text-orange-500" : "text-foreground")}>{s.name}</div>
                    <div className="truncate text-[9px] text-muted-foreground/60">{s.items}</div>
                  </div>
                  <span className={cn("shrink-0 font-mono text-[11px] font-bold", active ? "text-orange-500" : "text-muted-foreground")}>¥{getScenePrice(s.id)}</span>
                  <div className={cn(
                    "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all",
                    active ? "border-[var(--accent)] bg-[var(--accent)] shadow-[0_0_6px_rgba(6,182,212,0.3)]" : "border-border"
                  )}>
                    {active && <Check className="h-2.5 w-2.5 text-white" />}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="mb-2.5 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        {/* Family */}
        <div className="mb-2.5">
          <div className="mb-1.5 flex items-center gap-1.5 px-1">
            <span className="h-2.5 w-0.5 rounded-full bg-[#ff6700]/50" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">家庭成员</span>
          </div>
          <div className="flex flex-wrap gap-1.5 px-1">
            {FAMILY_OPTS.map((o) => (
              <button key={o.v} type="button" onClick={() => toggleFamily(o.v)}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-[11px] font-medium transition-all duration-300",
                  family.includes(o.v)
                    ? "border-[var(--accent)]/20 bg-orange-50 text-orange-500 shadow-[0_0_8px_rgba(6,182,212,0.06)]"
                    : "border-border bg-muted text-muted-foreground hover:border-border hover:text-foreground"
                )}
              >{o.t}</button>
            ))}
          </div>
        </div>

        {/* Renovation */}
        <div>
          <div className="mb-1.5 flex items-center gap-1.5 px-1">
            <span className="h-2.5 w-0.5 rounded-full bg-[#ff6700]/50" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">装修阶段</span>
          </div>
          <div className="flex flex-col gap-1 px-1">
            {RENO_OPTS.map((o) => (
              <button key={o.v} type="button" onClick={() => setReno(reno === o.v ? "" : o.v)}
                className={cn(
                  "flex items-center justify-between rounded-lg border px-3 py-2 text-left transition-all duration-300",
                  reno === o.v
                    ? "border-[var(--accent)]/20 bg-orange-50 shadow-[0_0_8px_rgba(6,182,212,0.06)]"
                    : "border-border hover:bg-muted"
                )}
              >
                <span className={cn("text-[11px] font-semibold", reno === o.v ? "text-orange-500" : "text-foreground")}>{o.t}</span>
                {o.tip && <span className={cn("text-[9px]", reno === o.v ? "text-orange-500/60" : "text-muted-foreground")}>{o.tip}</span>}
              </button>
            ))}
          </div>
        </div>
      </ScrollArea>
    </motion.aside>
  );
}
