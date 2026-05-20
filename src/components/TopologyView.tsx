"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Wifi, Cpu, Router, Home, ChevronDown, Zap,
  Layers, ShieldCheck, Sparkles
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

const protoDot: Record<string, string> = {
  wifi: "bg-zinc-400",
  zigbee: "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.5)]",
  ble_mesh: "bg-sky-400 shadow-[0_0_6px_rgba(56,189,248,0.5)]",
};

const roomTint: Record<string, { bg: string; border: string; shadow: string }> = {
  "客厅": { bg: "from-cyan-950/50 to-cyan-900/20", border: "border-cyan-500/20", shadow: "shadow-[0_0_20px_rgba(6,182,212,0.08)]" },
  "卧室": { bg: "from-violet-950/40 to-violet-900/15", border: "border-violet-500/20", shadow: "shadow-[0_0_20px_rgba(139,92,246,0.08)]" },
  "门口": { bg: "from-amber-950/40 to-amber-900/15", border: "border-amber-500/20", shadow: "shadow-[0_0_20px_rgba(245,158,11,0.08)]" },
  "全屋": { bg: "from-slate-900/40 to-slate-800/20", border: "border-slate-500/20", shadow: "shadow-[0_0_20px_rgba(148,163,184,0.06)]" },
};
const defaultTint = { bg: "from-slate-900/30 to-slate-800/15", border: "border-slate-500/15", shadow: "shadow-[0_0_20px_rgba(148,163,184,0.04)]" };

export function TopologyView({ rooms, needsGateway, totalDevices, totalPrice, sceneCount, onShowBreakdown, onClear, onExport }: Props) {
  const mainRooms = rooms.filter(r => r.name !== "全屋");
  const wholeRooms = rooms.filter(r => r.name === "全屋");

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-transparent">
      {/* Data Dashboard */}
      {rooms.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="shrink-0 border-b border-border/30 glass px-5 py-2.5"
        >
          <div className="flex items-center gap-1">
            <Dash icon={Layers} label="空间" val={`${rooms.length}间`} />
            <DashSep /><Dash icon={Zap} label="设备" val={`${totalDevices}个`} />
            <DashSep /><Dash icon={Cpu} label="网关" val={needsGateway ? "需配" : "无需"} hi={needsGateway} />
            <DashSep /><Dash icon={Wifi} label="协议" val={`W${cp(rooms,"wifi")}·Z${cp(rooms,"zigbee")}·M${cp(rooms,"ble_mesh")}`} />
            <DashSep /><Dash icon={ShieldCheck} label="兼容" val="通过" hi />
            <div className="ml-auto flex items-baseline gap-2">
              <span className="text-[9px] text-muted-foreground">方案总价</span>
              <span className="font-mono text-xl font-extrabold text-[var(--accent)] num-glow">¥{totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </motion.div>
      )}

      <div className="flex-1 overflow-y-auto">
        {rooms.length === 0 ? <EmptyState /> : (
          <div className="max-w-5xl mx-auto p-6 space-y-6">
            {/* Hub Bar */}
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-3"
            >
              <HubPill icon={Router} label="路由器" />
              {needsGateway && (
                <>
                  <ConnSVG />
                  <HubPill icon={Cpu} label="多模网关" accent />
                </>
              )}
              <span className="ml-4 text-[10px] text-muted-foreground">
                {sceneCount} 场景 · {rooms.length} 空间智能覆盖
              </span>
            </motion.div>

            {/* Isometric 3D Room Grid */}
            <div className="grid grid-cols-2 gap-3">
              {mainRooms.map((room, i) => (
                <IsoRoom key={room.id} room={room} idx={i} needsGw={needsGateway} />
              ))}
            </div>
            {wholeRooms.map((room, i) => (
              <IsoRoom key={room.id} room={room} idx={i} needsGw={needsGateway} wide />
            ))}

            {/* Protocol legend */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-6 text-[10px] text-muted-foreground"
            >
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-zinc-400" />WiFi</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_4px_rgba(52,211,153,0.3)]" />Zigbee</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_4px_rgba(56,189,248,0.3)]" />BLE Mesh</span>
            </motion.div>
          </div>
        )}
      </div>

      {rooms.length > 0 && (
        <SummaryBar totalDevices={totalDevices} totalPrice={totalPrice} sceneCount={sceneCount}
          onBreakdown={onShowBreakdown} onClear={onClear} onExport={onExport} />
      )}
    </div>
  );
}

/* ─── Dashboard Item ─── */
function Dash({ icon: Icon, label, val, hi }: { icon: typeof Home; label: string; val: string; hi?: boolean }) {
  return (
    <div className="flex items-center gap-2 px-3">
      <Icon className={cn("h-3.5 w-3.5", hi ? "text-[var(--accent)]" : "text-muted-foreground")} />
      <span className="text-[9px] text-muted-foreground">{label}</span>
      <span className={cn("text-[11px] font-bold", hi ? "text-[var(--accent)]" : "text-foreground")}>{val}</span>
    </div>
  );
}
function DashSep() { return <div className="h-5 w-px bg-border/40" />; }
function ConnSVG() {
  return (
    <svg width="44" height="12" className="shrink-0">
      <line x1="0" y1="6" x2="36" y2="6" stroke="url(#gl)" strokeWidth="1.5" strokeDasharray="4,3" />
      <polygon points="32,2 40,6 32,10" fill="oklch(0.55 0.01 260)" />
      <defs>
        <linearGradient id="gl" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="oklch(0.55 0.01 260)" />
          <stop offset="100%" stopColor="var(--accent)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─── Hub Pill ─── */
function HubPill({ icon: Icon, label, accent }: { icon: typeof Router; label: string; accent?: boolean }) {
  return (
    <div className={cn(
      "flex items-center gap-2 rounded-lg border px-3 py-2 text-[12px] font-semibold",
      accent ? "border-cyan-500/20 bg-cyan-500/10 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.15)]"
        : "border-border/40 glass text-foreground"
    )}>
      <Icon className="h-4 w-4" />
      {label}
    </div>
  );
}

/* ─── Isometric Room Block ─── */
function IsoRoom({ room, idx, needsGw, wide }: { room: Room; idx: number; needsGw: boolean; wide?: boolean }) {
  const [open, setOpen] = useState(true);
  const Icon = IconMap[room.icon] || Home;
  const t = roomTint[room.name] || defaultTint;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 180, damping: 24, delay: idx * 0.06 }}
      className={cn(
        "group overflow-hidden rounded-2xl border transition-all duration-300",
        t.border, t.shadow,
        open ? "bg-gradient-to-b " + t.bg : "bg-gradient-to-b " + t.bg,
        "hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] backdrop-blur-sm",
        wide && "col-span-full"
      )}
    >
      {/* Room Header */}
      <button type="button" onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-3 px-4 py-3.5"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/5 shadow-sm group-hover:border-cyan-500/20 transition-all">
          <Icon className="h-5 w-5 text-[var(--accent)]" />
        </div>
        <div className="flex-1 text-left">
          <div className="text-sm font-bold">{room.name}</div>
          <div className="text-[10px] text-muted-foreground">
            {room.devices.length} 设备 · {cp([room],"wifi")+cp([room],"zigbee")+cp([room],"ble_mesh")} 协议
          </div>
        </div>
        <span className="font-mono text-base font-extrabold text-[var(--accent)]">¥{room.price.toLocaleString()}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-4 w-4 text-muted-foreground/40" />
        </motion.div>
      </button>

      {/* Devices */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 grid grid-cols-2 gap-2">
              {room.devices.map((d, j) => (
                <DevBlock key={d.id} device={d} delay={j * 0.04} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Device Block ─── */
function DevBlock({ device, delay }: { device: Device; delay: number }) {
  const Icon = IconMap[device.icon] || Zap;
  const proto = protoDot[device.proto] || protoDot.wifi;
  const needsGw = device.proto === "zigbee" || device.proto === "ble_mesh";
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.2 }}
      className="group/dev flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 p-3 transition-all duration-300 hover:border-cyan-500/20 hover:bg-white/10 hover:shadow-[0_0_16px_rgba(6,182,212,0.12)] hover:scale-[1.02]"
    >
      {/* Icon with proto ring */}
      <div className="relative shrink-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/5 group-hover/dev:border-cyan-500/15 transition-colors">
          {Icon && <Icon className="h-5 w-5 text-muted-foreground group-hover/dev:text-[var(--accent)] transition-colors" />}
        </div>
        <span className={cn("absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-black/20", proto)} />
      </div>
      {/* Info */}
      <div className="min-w-0 flex-1">
        <div className="text-[11px] font-semibold truncate">{device.name}</div>
        <div className="flex items-center gap-1.5 mt-0.5">
          {needsGw && <span className="text-[9px] text-amber-400/80">→网关</span>}
          {device.install && (
            <span className={cn("rounded px-1.5 py-px text-[8px] font-medium",
              device.install==="wired"?"bg-amber-500/10 text-amber-400":
              device.install==="wireless"?"bg-emerald-500/10 text-emerald-400":
              "bg-sky-500/10 text-sky-400")}>
              {device.install==="wired"?"布线":device.install==="wireless"?"无线":"插电"}
            </span>
          )}
        </div>
      </div>
      <span className="shrink-0 font-mono text-xs font-bold text-[var(--accent)]">¥{device.price}</span>
    </motion.div>
  );
}

function EmptyState() {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
      className="flex h-full flex-col items-center justify-center gap-5">
      <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border-2 border-dashed border-white/5 glass">
        <Home className="h-10 w-10 text-muted-foreground/20" />
        <Sparkles className="absolute -top-1 -right-1 h-5 w-5 text-[var(--accent)] animate-pulse" />
      </div>
      <div className="text-sm font-semibold text-muted-foreground">选择左侧场景，生成全屋智能方案</div>
      <div className="text-xs text-muted-foreground/40 max-w-sm text-center">
        设备按房间分区 · WiFi / Zigbee / BLE Mesh 混合组网 · 协议兼容实时校验
      </div>
    </motion.div>
  );
}

function cp(rooms: Room[], proto: string): number {
  return rooms.reduce((n, r) => n + r.devices.filter(d => d.proto === proto).length, 0);
}
