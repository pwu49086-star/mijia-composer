"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { RoomIconMap, type Room } from "@/data/icons";
import { DeviceItem } from "./DeviceItem";
import { cn } from "@/lib/utils";

export function RoomCard({ room, index }: { room: Room; index: number }) {
  const [open, setOpen] = useState(true);
  const Icon = RoomIconMap[room.name];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8, scale: 0.96 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 25,
        delay: index * 0.06,
      }}
      className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:border-border/80 hover:shadow-md"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-2.5 px-3 py-2.5 transition-colors hover:bg-muted/40"
      >
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-border bg-muted transition-all group-hover:border-indigo-500/10 group-hover:bg-indigo-500/[0.04]">
          {Icon && <Icon className="h-3.5 w-3.5 text-muted-foreground transition-colors group-hover:text-indigo-500" />}
        </div>
        <div className="min-w-0 flex-1 text-left">
          <div className="text-[11px] font-semibold text-foreground">{room.name}</div>
          <div className="text-[9px] text-muted-foreground">{room.devices.length} 个设备</div>
        </div>
        <span className="shrink-0 font-mono text-[10px] font-semibold text-indigo-500">
          ¥{room.price}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <ChevronDown className="h-3 w-3 text-muted-foreground" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-border px-3 pb-3 pt-2">
              <div className="flex flex-col gap-1">
                {room.devices.map((d) => (
                  <DeviceItem key={d.id} device={d} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
