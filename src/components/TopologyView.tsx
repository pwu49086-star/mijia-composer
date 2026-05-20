"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Wifi, Cpu, Router, Home, ChevronDown, Zap,
  Layers, ShieldCheck
} from "lucide-react";
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

const protoColors: Record<string, { dot: string; label: string }> = {
  wifi: { dot: "bg-zinc-400", label: "WiFi" },
  zigbee: { dot: "bg-emerald-500", label: "Zigbee" },
  ble_mesh: { dot: "bg-blue-500", label: "BLE Mesh" },
};

// Visual layout positioning for rooms
const roomLayout: Record<string, { area: string; tint: string; borderTint: string }> = {
  "客厅": { area: "col-span-2 row-span-1", tint: "from-orange-50/80 to-orange-50/20", borderTint: "border-orange-200/60" },
  "卧室": { area: "col-span-1 row-span-1", tint: "from-purple-50/60 to-purple-50/10", borderTint: "border-purple-200/40" },
  "门口": { area: "col-span-1 row-span-1", tint: "from-sky-50/60 to-sky-50/10", borderTint: "border-sky-200/40" },
};
const defaultRoomStyle = { area: "col-span-1 row-span-1", tint: "from-stone-50/60 to-stone-50/10", borderTint: "border-stone-200/30" };

export function TopologyView({ rooms, needsGateway, totalDevices, totalPrice, sceneCount, onShowBreakdown, onClear, onExport }: Props) {
  // Split rooms: non-全屋 rooms + 全屋
  const mainRooms = rooms.filter(r => r.name !== "全屋");
  const wholeRooms = rooms.filter(r => r.name === "全屋");

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-background">
      {/* ─── Data Dashboard ─── */}
      {rooms.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="shrink-0 border-b border-border/50 bg-card/60 backdrop-blur-sm"
        >
          <div className="flex items-center gap-1 px-6 py-2.5">
            <DashItem icon={Layers} label="空间" value={`${rooms.length} 间`} />
            <DashDivider />
            <DashItem icon={Zap} label="设备" value={`${totalDevices} 个`} />
            <DashDivider />
            <DashItem icon={Cpu} label="网关" value={needsGateway ? "需要" : "无需"} accent={needsGateway} />
            <DashDivider />
            <DashItem icon={Wifi} label="协议" value={`WiFi ${countP(rooms,"wifi")} · Zigbee ${countP(rooms,"zigbee")} · Mesh ${countP(rooms,"ble_mesh")}`} />
            <DashDivider />
            <DashItem icon={ShieldCheck} label="兼容性" value="通过" accent />
            <div className="ml-auto flex items-baseline gap-2">
              <span className="text-[10px] text-muted-foreground">方案总价</span>
              <span className="font-mono text-xl font-extrabold text-[var(--accent)]">¥{totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── Main View ─── */}
      <div className="flex-1 overflow-y-auto">
        {rooms.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="max-w-4xl mx-auto p-5 space-y-5">
            {/* Hub + Topology Header */}
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-3"
            >
              <Pill icon={Router} label="路由器" />
              {needsGateway && (
                <>
                  <svg width="48" height="12" className="shrink-0">
                    <line x1="0" y1="6" x2="40" y2="6" stroke="url(#grad)" strokeWidth="1.5" strokeDasharray="4,3" />
                    <polygon points="36,2 44,6 36,10" fill="#d4d4d8" />
                    <defs>
                      <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#d4d4d8" />
                        <stop offset="100%" stopColor="var(--accent)" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <Pill icon={Cpu} label="多模网关" accent />
                </>
              )}
              <span className="ml-4 text-[11px] text-muted-foreground">
                {sceneCount} 个场景 · 方案驱动 {rooms.length} 个空间的智能覆盖
              </span>
            </motion.div>

            {/* Floor plan grid */}
            <div className="grid grid-cols-3 gap-3">
              {mainRooms.map((room, i) => (
                <RoomZone key={room.id} room={room} index={i} needsGateway={needsGateway} />
              ))}
            </div>

            {/* 全屋 row */}
            {wholeRooms.map((room, i) => (
              <RoomZone key={room.id} room={room} index={i} needsGateway={needsGateway} fullWidth />
            ))}

            {/* Protocol legend */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-6 text-[10px] text-muted-foreground pt-1"
            >
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-zinc-400" />WiFi 直连路由器</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500" />Zigbee → 网关</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-500" />BLE Mesh → 网关</span>
            </motion.div>
          </div>
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

/* ─── Dashboard Item ─── */
function DashItem({ icon: Icon, label, value, accent }: { icon: typeof Home; label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center gap-2 px-3">
      <Icon className={cn("h-3.5 w-3.5", accent ? "text-[var(--accent)]" : "text-muted-foreground")} />
      <span className="text-[10px] text-muted-foreground">{label}</span>
      <span className={cn("text-[11px] font-bold", accent ? "text-[var(--accent)]" : "text-foreground")}>{value}</span>
    </div>
  );
}
function DashDivider() {
  return <div className="h-5 w-px bg-border/60" />;
}

/* ─── Pill ─── */
function Pill({ icon: Icon, label, accent }: { icon: typeof Router; label: string; accent?: boolean }) {
  return (
    <div className={cn(
      "flex items-center gap-2 rounded-lg border px-3 py-2 text-[13px] font-semibold shadow-sm",
      accent ? "border-orange-200 bg-orange-50 text-orange-600" : "border-border bg-card text-foreground"
    )}>
      <Icon className="h-4 w-4" />
      {label}
    </div>
  );
}

/* ─── Room Zone (floor-plan style) ─── */
function RoomZone({ room, index, needsGateway, fullWidth }: { room: Room; index: number; needsGateway: boolean; fullWidth?: boolean }) {
  const [open, setOpen] = useState(true);
  const Icon = IconMap[room.icon] || Home;
  const style = roomLayout[room.name] || defaultRoomStyle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 26, delay: index * 0.05 }}
      className={cn(
        "group overflow-hidden rounded-2xl border shadow-sm transition-shadow",
        style.borderTint,
        open ? "shadow-md" : "shadow-sm",
        fullWidth && "col-span-full"
      )}
    >
      {/* Gradient tint background */}
      <div className={cn("relative bg-gradient-to-b", style.tint)}>
        {/* Header */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex w-full items-center gap-3 px-4 py-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-border/50 shadow-sm">
            <Icon className="h-4.5 w-4.5 text-[var(--accent)]" />
          </div>
          <div className="flex-1 text-left">
            <div className="text-sm font-bold">{room.name}</div>
            <div className="text-[10px] text-muted-foreground">{room.devices.length} 个设备 · {countP([room],"wifi")+countP([room],"zigbee")+countP([room],"ble_mesh")} 个协议</div>
          </div>
          <span className="font-mono text-base font-extrabold text-[var(--accent)]">¥{room.price.toLocaleString()}</span>
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="h-4 w-4 text-muted-foreground/40" />
          </motion.div>
        </button>

        {/* Device Grid */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4">
                <div className="grid grid-cols-2 gap-2">
                  {room.devices.map((d, j) => (
                    <DevCard key={d.id} device={d} delay={j * 0.03} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ─── Device Card ─── */
function DevCard({ device, delay }: { device: Device; delay: number }) {
  const Icon = IconMap[device.icon] || Zap;
  const proto = protoColors[device.proto] || protoColors.wifi;
  const needsGw = device.proto === "zigbee" || device.proto === "ble_mesh";

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.18 }}
      className="group flex items-center gap-3 rounded-xl border border-border/60 bg-white p-3 shadow-sm transition-all hover:border-orange-200/60 hover:shadow-md"
    >
      {/* Icon + proto dot */}
      <div className="relative flex-shrink-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-50 border border-border/50 group-hover:border-orange-200/40 group-hover:bg-orange-50/30 transition-colors">
          {Icon && <Icon className="h-5 w-5 text-muted-foreground group-hover:text-[var(--accent)] transition-colors" />}
        </div>
        <span className={cn("absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white shadow-sm", proto.dot)} />
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <div className="text-xs font-semibold truncate">{device.name}</div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-[9px] text-muted-foreground">{proto.label}</span>
          {needsGw && <span className="text-[9px] text-amber-500">→ 网关</span>}
          {device.install && (
            <span className={cn(
              "rounded px-1.5 py-px text-[8px] font-medium leading-none",
              device.install === "wired" ? "bg-amber-50 text-amber-600" : device.install === "wireless" ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"
            )}>
              {device.install === "wired" ? "需布线" : device.install === "wireless" ? "无线" : "插电"}
            </span>
          )}
        </div>
      </div>

      {/* Price */}
      <span className="flex-shrink-0 font-mono text-xs font-bold text-[var(--accent)]">¥{device.price}</span>
    </motion.div>
  );
}

/* ─── Empty State ─── */
function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex h-full flex-col items-center justify-center gap-4"
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl border-2 border-dashed border-border bg-muted/30">
        <Home className="h-9 w-9 text-muted-foreground/25" />
      </div>
      <div className="text-sm font-semibold text-muted-foreground">选择左侧场景，生成全屋智能方案</div>
      <div className="text-xs text-muted-foreground/50 max-w-xs text-center">
        设备按房间自动分区，协议兼容性实时校验，WiFi / Zigbee / BLE Mesh 混合组网可视化
      </div>
    </motion.div>
  );
}

/* ─── Helper ─── */
function countP(rooms: Room[], proto: string): number {
  return rooms.reduce((n, r) => n + r.devices.filter((d) => d.proto === proto).length, 0);
}
