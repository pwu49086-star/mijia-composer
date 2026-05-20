"use client";

import { motion } from "framer-motion";
import { IconMap, type Device } from "@/data/icons";
import { cn } from "@/lib/utils";

const protoLabel: Record<string, { label: string; color: string }> = {
  wifi: { label: "WiFi 直连", color: "bg-zinc-400" },
  zigbee: { label: "Zigbee → 网关", color: "bg-green-500" },
  ble_mesh: { label: "Mesh → 网关", color: "bg-indigo-500" },
};

const installLabel: Record<string, string> = {
  wired: "需布线",
  wireless: "无线",
  plug: "插电",
};

export function DeviceItem({ device, onRemove }: { device: Device; onRemove?: () => void }) {
  const Icon = IconMap[device.icon];
  const proto = protoLabel[device.proto] || protoLabel.wifi;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -4 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -4 }}
      transition={{ duration: 0.15 }}
      className="group flex items-center gap-2 rounded-lg border border-transparent bg-muted/60 px-2 py-1.5 transition-all hover:border-border hover:bg-card hover:translate-x-0.5"
    >
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-border bg-card transition-all group-hover:border-indigo-500/30 group-hover:bg-indigo-500/[0.04]">
        {Icon && <Icon className="h-3 w-3 text-muted-foreground transition-colors group-hover:text-indigo-500" />}
      </div>

      <div className="min-w-0 flex-1">
        <div className="text-[10px] font-semibold text-foreground/80">{device.name}</div>
        <div className="mt-0.5 flex items-center gap-1.5 text-[8px] text-muted-foreground">
          <span className={cn("h-1 w-1 rounded-full", proto.color)} />
          {proto.label}
          {device.install && installLabel[device.install] && (
            <span className="rounded bg-muted px-1 py-px text-[7px] text-muted-foreground/60">
              {installLabel[device.install]}
            </span>
          )}
        </div>
      </div>

      <span className="shrink-0 font-mono text-[9px] font-semibold text-indigo-500">
        ¥{device.price}
      </span>

      {onRemove && (
        <button
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          className="flex h-4 w-4 shrink-0 items-center justify-center rounded text-[11px] text-muted-foreground opacity-0 transition-all hover:bg-rose-500/10 hover:text-rose-500 group-hover:opacity-100"
        >
          ×
        </button>
      )}
    </motion.div>
  );
}
