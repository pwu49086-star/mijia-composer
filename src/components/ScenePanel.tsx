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
  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.05 }}
      className="flex w-72 shrink-0 flex-col border-r border-border bg-card"
    >
      <div className="border-b border-border px-4 py-3">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Configuration
        </span>
      </div>

      <ScrollArea className="flex-1 px-4 py-2">
        {/* Scene selection */}
        <section className="mb-2">
          <div className="mb-1.5 flex items-center gap-1.5">
            <span className="h-2.5 w-0.5 rounded-full bg-indigo-500/50" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              选择场景
            </span>
            <button
              type="button"
              onClick={selAll}
              className="ml-auto text-[10px] font-medium text-indigo-500 transition-opacity hover:opacity-70"
            >
              全选
            </button>
          </div>

          <div className="flex flex-col gap-px">
            {SCENES.map((s, idx) => {
              const active = sel.includes(s.id);
              const Icon = SceneIconMap[s.icon];
              return (
                <motion.button
                  key={s.id}
                  onClick={() => tog(s.id)}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.025, duration: 0.2 }}
                  className={cn(
                    "group flex items-center gap-2 rounded-lg border border-transparent px-2 py-1.5 text-left transition-all",
                    active
                      ? "border-indigo-500/12 bg-indigo-500/[0.04]"
                      : "hover:bg-muted/60"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition-all",
                      active
                        ? "border-indigo-500/10 bg-indigo-500/[0.06]"
                        : "border-border bg-muted"
                    )}
                  >
                    {Icon && (
                      <Icon
                        className={cn(
                          "h-3 w-3 transition-colors",
                          active ? "text-indigo-500" : "text-muted-foreground"
                        )}
                      />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div
                      className={cn(
                        "text-[12px] font-semibold transition-colors",
                        active ? "text-indigo-600" : "text-foreground"
                      )}
                    >
                      {s.name}
                    </div>
                    <div className="truncate text-[9px] text-muted-foreground/70">
                      {s.items}
                    </div>
                  </div>

                  <span
                    className={cn(
                      "shrink-0 font-mono text-[11px] font-semibold transition-colors",
                      active ? "text-indigo-500" : "text-muted-foreground"
                    )}
                  >
                    ¥{getScenePrice(s.id)}
                  </span>

                  <div
                    className={cn(
                      "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all",
                      active
                        ? "border-indigo-500 bg-indigo-500"
                        : "border-border"
                    )}
                  >
                    {active && <Check className="h-2.5 w-2.5 text-white" />}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </section>

        <div className="mb-3 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* Family */}
        <section className="mb-3">
          <div className="mb-1.5 flex items-center gap-1.5">
            <span className="h-2.5 w-0.5 rounded-full bg-indigo-500/50" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              家庭成员
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {FAMILY_OPTS.map((o) => (
              <button
                type="button"
                key={o.v}
                onClick={() => toggleFamily(o.v)}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-xs font-medium transition-all",
                  family.includes(o.v)
                    ? "border-indigo-500/15 bg-indigo-500/[0.06] text-indigo-600"
                    : "border-border bg-muted text-muted-foreground hover:border-border/80"
                )}
              >
                {o.t}
              </button>
            ))}
          </div>
        </section>

        {/* User type */}
        <section>
          <div className="mb-1.5 flex items-center gap-1.5">
            <span className="h-2 w-0.5 rounded-full bg-indigo-500/50" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              装修阶段
            </span>
          </div>
          <div className="flex flex-col gap-1">
            {RENO_OPTS.map((o) => (
              <button
                type="button"
                key={o.v}
                onClick={() => setReno(reno === o.v ? "" : o.v)}
                className={cn(
                  "flex items-center justify-between rounded-lg border px-3 py-1.5 text-left transition-all",
                  reno === o.v
                    ? "border-indigo-500/20 bg-indigo-500/[0.06] shadow-sm"
                    : "border-border hover:bg-muted/60"
                )}
              >
                <span
                  className={cn(
                    "text-xs font-semibold transition-colors",
                    reno === o.v ? "text-indigo-600" : "text-foreground"
                  )}
                >
                  {o.t}
                </span>
                {o.tip && (
                  <span
                    className={cn(
                      "text-[9px] transition-colors",
                      reno === o.v ? "text-indigo-500/70" : "text-muted-foreground"
                    )}
                  >
                    {o.tip}
                  </span>
                )}
              </button>
            ))}
          </div>
        </section>
      </ScrollArea>
    </motion.aside>
  );
}
