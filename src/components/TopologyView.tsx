"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Wifi, Cpu, Home, Router, ChevronDown } from "lucide-react";
import { useState } from "react";
import type { Room, Device } from "@/data/icons";
import { IconMap } from "@/data/icons";
import { SummaryBar } from "./SummaryBar";
import { cn } from "@/lib/utils";

interface Props {
  rooms: Room[];
  needsGateway: boolean;
  totalDevices: number;
  totalPrice: number;
  sceneCount: number;
  onShowBreakdown: () => void;
  onClear: () => void;
  onExport: () => void;
}

const protoInfo: Record<string, { label: string; dot: string }> = {
  wifi: { label: "WiFi", dot: "bg-zinc-400" },
  zigbee: { label: "Zigbee", dot: "bg-emerald-500" },
  ble_mesh: { label: "Mesh", dot: "bg-indigo-500" },
};

const installInfo: Record<string, { label: string; color: string }> = {
  wired: { label: "布线", color: "text-amber-600 bg-amber-50 border-amber-200" },
  wireless: { label: "无线", color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
  plug: { label: "插电", color: "text-blue-600 bg-blue-50 border-blue-200" },
};

export function TopologyView({ rooms, needsGateway, totalDevices, totalPrice, sceneCount, onShowBreakdown, onClear, onExport }: Props) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-background">
      <div className="flex-1 overflow-y-auto p-3">
        {rooms.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Hub bar */}
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="mb-3 flex items-center justify-center gap-2"
            >
              <HubPill icon={Router} label="路由器" />
              {needsGateway && (
                <>
                  <div className="h-px w-5 bg-gradient-to-r from-indigo-300 to-indigo-400" />
                  <HubPill icon={Cpu} label="多模网关" accent />
                </>
              )}
              <div className="ml-3 flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-mono font-semibold text-foreground">{rooms.length}</span> 房间
                <span className="mx-1 text-border">·</span>
                <span className="font-mono font-semibold text-foreground">{totalDevices}</span> 设备
              </div>
            </motion.div>

            {/* Room grid — 3 columns */}
            <div className="grid grid-cols-3 gap-2.5">
              <AnimatePresence mode="popLayout">
                {rooms.map((room, i) => (
                  <RoomCardV2 key={room.id} room={room} index={i} />
                ))}
              </AnimatePresence>
            </div>

            {/* Protocol legend — inline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-3 flex items-center justify-center gap-4 text-[10px] text-muted-foreground"
            >
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-zinc-400" />WiFi 直连</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500" />Zigbee 低功耗</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-indigo-500" />BLE Mesh</span>
            </motion.div>
          </>
        )}
      </div>

      {rooms.length > 0 && (
        <SummaryBar
          totalDevices={totalDevices}
          totalPrice={totalPrice}
          sceneCount={sceneCount}
          onBreakdown={onShowBreakdown}
          onClear={onClear}
          onExport={onExport}
        />
      )}
    </div>
  );
}

/* ─── Hub Pill ─── */
function HubPill({ icon: Icon, label, accent }: { icon: typeof Router; label: string; accent?: boolean }) {
  return (
    <div className={cn(
      "flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold shadow-sm",
      accent ? "border-indigo-200 bg-indigo-50 text-indigo-600" : "border-border bg-card text-foreground"
    )}>
      <Icon className="h-4 w-4" />
      {label}
    </div>
  );
}

/* ─── Room Card ─── */
function RoomCardV2({ room, index }: { room: Room; index: number }) {
  const [open, setOpen] = useState(true);
  const Icon = IconMap[room.icon] || Home;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 250, damping: 25, delay: index * 0.04 }}
      className="group overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm transition-all hover:border-border hover:shadow-md"
    >
      {/* Header */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-2.5 px-3 py-2.5 transition-colors hover:bg-muted/30"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 border border-indigo-100">
          <Icon className="h-4 w-4 text-indigo-500" />
        </div>
        <div className="flex-1 text-left">
          <div className="text-xs font-semibold">{room.name}</div>
          <div className="text-[10px] text-muted-foreground">{room.devices.length} 个设备</div>
        </div>
        <span className="font-mono text-xs font-bold text-indigo-600">¥{room.price.toLocaleString()}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.15 }}>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </motion.div>
      </button>

      {/* Devices */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-border/40 px-3 pb-2.5 pt-1.5 space-y-0.5">
              {room.devices.map((d, i) => (
                <DeviceRow key={d.id} device={d} delay={i * 0.02} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Device Row ─── */
function DeviceRow({ device, delay }: { device: Device; delay: number }) {
  const Icon = IconMap[device.icon];
  const proto = protoInfo[device.proto] || protoInfo.wifi;
  const install = device.install ? installInfo[device.install] : null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -4 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.15 }}
      className="group flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-muted/40"
    >
      {/* Icon */}
      <div className="relative flex-shrink-0">
        <div className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card">
          {Icon && <Icon className="h-3.5 w-3.5 text-muted-foreground" />}
        </div>
        <span className={cn("absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border-2 border-card", proto.dot)} />
      </div>

      {/* Name + tags */}
      <div className="min-w-0 flex-1 flex items-center gap-1.5">
        <span className="text-[11px] font-medium truncate">{device.name}</span>
        {install && (
          <span className={cn("flex-shrink-0 rounded border px-1.5 py-px text-[9px] font-medium leading-none", install.color)}>
            {install.label}
          </span>
        )}
      </div>

      {/* Price */}
      <span className="flex-shrink-0 font-mono text-[11px] font-semibold text-indigo-500">¥{device.price}</span>
    </motion.div>
  );
}

/* ─── Empty State ─── */
function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex h-full flex-col items-center justify-center gap-3"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card shadow-md">
        <Home className="h-7 w-7 text-muted-foreground/40" />
      </div>
      <div className="text-sm font-medium text-muted-foreground">选择左侧场景，查看智能方案</div>
      <div className="text-xs text-muted-foreground/50">点击场景卡片即可预览设备拓扑</div>
    </motion.div>
  );
}
