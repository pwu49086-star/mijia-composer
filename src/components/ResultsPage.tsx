"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  ArrowLeft, Share2, Download, ShieldCheck,
  Wrench, Zap, ChevronRight, Cpu, ChevronDown,
} from "lucide-react";
import { IconMap, type Room } from "@/data/icons";
import { INSTALL_ORDER } from "@/data/installGuide";
import { AUTOMATION_TEMPLATES } from "@/data/automation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  rooms: Room[];
  needsGateway: boolean;
  totalDevices: number;
  totalPrice: number;
  selectedScenes: string[];
  renovation: string;
  onBack: () => void;
  onExport: () => void;
}

const renoLabel: Record<string, string> = {
  planning: "还没装修",
  renovating: "装修中",
  lived: "已入住",
};

export function ResultsPage({
  rooms, needsGateway, totalDevices, totalPrice,
  selectedScenes, renovation, onBack, onExport,
}: Props) {
  return (
    <div className="h-screen flex flex-col bg-[#f8f9fa]">
      {/* Header + Summary */}
      <header className="shrink-0 bg-white border-b border-border/40">
        <div className="flex items-center justify-between px-6 h-12">
          <div className="flex items-center gap-3">
            <button type="button" onClick={onBack} title="返回修改" className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-xs">返回</span>
            </button>
            <span className="text-border/30">|</span>
            <span className="text-sm font-bold">方案确认书</span>
            <span className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 rounded-full px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
              <ShieldCheck className="h-3 w-3" /> 兼容性通过
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-lg font-extrabold">¥{totalPrice.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground">{totalDevices} 设备 · {rooms.length} 房间 · {selectedScenes.length} 场景</span>
            {needsGateway && <span className="text-[10px] text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-full px-2 py-0.5 flex items-center gap-1"><Cpu className="h-3 w-3" />需网关</span>}
            <Button variant="outline" size="sm" className="h-7 px-3 text-xs gap-1.5"><Share2 className="h-3.5 w-3.5" />分享</Button>
            <Button size="sm" className="h-7 px-3 text-xs gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white" onClick={onExport}><Download className="h-3.5 w-3.5" />导出</Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Shopping */}
        <div className="w-[420px] shrink-0 flex flex-col border-r border-border/30 bg-white">
          <div className="px-4 py-2.5 border-b border-border/20 text-[15px] font-bold text-muted-foreground">购物清单</div>
          <div className="flex-1 overflow-y-auto p-3.5 space-y-2">
            {rooms.map((r, i) => <RoomRow key={r.id} room={r} index={i} />)}
            {needsGateway && <GatewayRow />}
          </div>
        </div>

        {/* Right: Install + Auto */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Install */}
          <Section icon={Wrench} title="安装指南">
            <div className="grid grid-cols-3 gap-2">
              {INSTALL_ORDER.filter((s) => {
                if (s.icon === "gateway") return needsGateway;
                if (s.icon === "speaker") return rooms.some((r) => r.devices.some((d) => d.proto === "ble_mesh"));
                if (s.icon === "sensor") return rooms.some((r) => r.devices.some((d) => d.proto === "zigbee"));
                if (s.icon === "light") return rooms.some((r) => r.devices.some((d) => d.install === "wired"));
                if (s.icon === "plug") return rooms.some((r) => r.devices.some((d) => d.install === "plug"));
                return true;
              }).map((s, i) => <StepCard key={s.step} step={s} delay={i * 0.03} />)}
            </div>
            <div className="mt-3 rounded-lg border border-border/30 bg-muted/15 px-4 py-2.5 flex items-center gap-6 text-[11px] text-muted-foreground/70">
              <span className="font-semibold text-muted-foreground">贴士</span>
              <span>• 网关放客厅中央，WiFi 信号好的位置</span>
              <span>• Zigbee 传感器电池续航约 1 年</span>
              <span>• 有线设备需关闭总闸后再操作</span>
              <span>• 全部添加完再创建智能场景</span>
            </div>
          </Section>

          {/* Automation */}
          <Section icon={Zap} title="自动化配置">
            <div className="grid grid-cols-3 gap-2">
              {selectedScenes.map((sid, i) => {
                const auto = AUTOMATION_TEMPLATES[sid];
                if (!auto) return null;
                return <AutoCard key={sid} auto={auto} delay={i * 0.03} />;
              })}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

/* ─── Section wrapper ─── */
function Section({ icon: Icon, title, children }: { icon: typeof Wrench; title: string; children: React.ReactNode }) {
  return (
    <div className="px-5 py-4 border-b border-border/20">
      <div className="flex items-center gap-2 mb-3.5">
        <Icon className="h-4.5 w-4.5 text-indigo-500" />
        <span className="text-[15px] font-bold">{title}</span>
      </div>
      {children}
    </div>
  );
}

/* ─── Room Row (shopping list) ─── */
function RoomRow({ room, index }: { room: Room; index: number }) {
  const [open, setOpen] = useState(false);
  const Icon = IconMap[room.icon] || Zap;

  return (
    <motion.div
      initial={{ opacity: 0, x: -4 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.05 + index * 0.03 }}
      className="rounded-lg border border-border/40 bg-white overflow-hidden hover:border-indigo-200/40 transition-colors"
    >
      <button type="button" onClick={() => setOpen(!open)} className="flex items-center justify-between w-full px-4 py-3">
        <div className="flex items-center gap-2.5">
          <motion.div animate={{ rotate: open ? 90 : 0 }} className="text-muted-foreground/30">
            <ChevronRight className="h-4 w-4" />
          </motion.div>
          <Icon className="h-4.5 w-4.5 text-indigo-500" />
          <span className="text-sm font-semibold">{room.name}</span>
          <span className="text-[11px] text-muted-foreground/50">{room.devices.length}件</span>
        </div>
        <span className="font-mono text-[15px] font-bold text-indigo-600">¥{room.price.toLocaleString()}</span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden"
          >
            <div className="border-t border-border/15 px-4 py-2 space-y-0.5">
              {room.devices.map((d) => (
                <div key={d.id} className="flex items-center gap-2.5 py-1.5 px-2 rounded-lg hover:bg-muted/20 transition-colors group">
                  <div className="h-7 w-7 flex items-center justify-center rounded-md bg-muted/30 group-hover:bg-indigo-50 transition-colors">
                    {(IconMap[d.icon] || Zap) && (() => { const I = IconMap[d.icon] || Zap; return <I className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-indigo-500 transition-colors" />; })()}
                  </div>
                  <span className="flex-1 text-[13px] font-medium truncate">{d.name}</span>
                  <span className={cn("text-[10px] font-semibold rounded px-1.5 py-px",
                    d.install === "wired" ? "bg-amber-50 text-amber-600" : d.install === "wireless" ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"
                  )}>{d.install === "wired" ? "布线" : d.install === "wireless" ? "无线" : "插电"}</span>
                  <span className="font-mono text-[13px] font-bold text-indigo-500">¥{d.price}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Gateway Row ─── */
function GatewayRow() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
      className="flex items-center gap-2.5 rounded-lg border border-dashed border-indigo-200 bg-indigo-50/20 px-3.5 py-3">
      <Cpu className="h-4 w-4 text-indigo-500" />
      <span className="flex-1 text-[13px] font-medium text-indigo-700">多模网关（必需）</span>
      <span className="font-mono text-[13px] font-bold text-indigo-600">¥169</span>
    </motion.div>
  );
}

/* ─── Step Card ─── */
const difficultyColor: Record<string, string> = {
  easy: "text-emerald-600 bg-emerald-50",
  medium: "text-amber-600 bg-amber-50",
  hard: "text-rose-600 bg-rose-50",
};
const difficultyLabel: Record<string, string> = {
  easy: "简单",
  medium: "中等",
  hard: "需布线",
};

function StepCard({ step, delay }: { step: typeof INSTALL_ORDER[0]; delay: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
      className="flex items-start gap-3 rounded-lg border border-border/40 bg-white px-4 py-3.5 hover:border-indigo-200/40 transition-colors group"
    >
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-[11px] font-bold text-white group-hover:scale-105 transition-transform">
        {step.step}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-semibold">{step.title}</span>
          <span className={cn("text-[9px] font-semibold rounded px-1.5 py-px", difficultyColor[step.difficulty])}>
            {difficultyLabel[step.difficulty]}
          </span>
        </div>
        <div className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{step.desc}</div>
      </div>
      <span className="shrink-0 text-[10px] text-muted-foreground/50 mt-0.5">{step.time}</span>
    </motion.div>
  );
}

/* ─── Auto Card ─── */
function AutoCard({ auto, delay }: { auto: typeof AUTOMATION_TEMPLATES[string]; delay: number }) {
  const [showApp, setShowApp] = useState(false);
  const IconComp = IconMap[auto.icon] || Zap;

  return (
    <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
      className="rounded-lg border border-border/40 bg-white overflow-hidden hover:border-indigo-200/40 transition-colors"
    >
      <div className="p-4">
        <div className="text-[13px] font-bold mb-3 flex items-center gap-2">
          <IconComp className="h-4 w-4 text-indigo-400" />
          {auto.name}
        </div>

        {/* Flow visual */}
        <div className="flex items-center gap-1.5 mb-3">
          <span className="shrink-0 rounded-md bg-amber-50 border border-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-600">触发</span>
          <svg width="20" height="12" className="shrink-0"><line x1="0" y1="6" x2="18" y2="6" stroke="#d4d4d8" strokeWidth="1.5" strokeDasharray="2,2"/><polygon points="14,2 20,6 14,10" fill="#d4d4d8"/></svg>
          {auto.conditions && auto.conditions.length > 0 ? (
            <>
              <span className="shrink-0 rounded-md bg-sky-50 border border-sky-100 px-2 py-0.5 text-[10px] font-semibold text-sky-600">条件</span>
              <svg width="20" height="12" className="shrink-0"><line x1="0" y1="6" x2="18" y2="6" stroke="#d4d4d8" strokeWidth="1.5" strokeDasharray="2,2"/><polygon points="14,2 20,6 14,10" fill="#d4d4d8"/></svg>
            </>
          ) : null}
          <span className="shrink-0 rounded-md bg-indigo-50 border border-indigo-100 px-2 py-0.5 text-[10px] font-semibold text-indigo-600">动作</span>
        </div>

        {/* Details */}
        <div className="space-y-1.5 text-[11px]">
          <div className="flex items-start gap-1.5">
            <span className="shrink-0 text-muted-foreground/50 mt-0.5">触发：</span>
            <span className="text-foreground/60">{auto.trigger}</span>
          </div>
          {auto.conditions && (
            <div className="flex items-start gap-1.5">
              <span className="shrink-0 text-muted-foreground/50 mt-0.5">条件：</span>
              <span className="text-foreground/60">{auto.conditions.join("、")}</span>
            </div>
          )}
          <div className="flex items-start gap-1.5">
            <span className="shrink-0 text-muted-foreground/50 mt-0.5">动作：</span>
            <div className="text-foreground/60">
              {auto.actions.slice(0, 3).map((a, j) => <div key={j} className="flex items-center gap-0.5"><ChevronRight className="h-2.5 w-2.5 text-indigo-400" />{a}</div>)}
              {auto.actions.length > 3 && <div className="text-[10px] text-muted-foreground/40">+{auto.actions.length - 3}</div>}
            </div>
          </div>
          {auto.voice && (
            <div className="flex items-start gap-1.5">
              <span className="shrink-0 text-muted-foreground/50 mt-0.5">语音：</span>
              <span className="text-emerald-700 italic">&ldquo;{auto.voice}&rdquo;</span>
            </div>
          )}
        </div>

        {/* App setup toggle */}
        {auto.appSteps && (
          <button
            type="button"
            onClick={() => setShowApp(!showApp)}
            className="mt-3 text-[10px] text-indigo-500 hover:text-indigo-600 font-medium flex items-center gap-1 transition-colors"
          >
            <ChevronRight className={cn("h-3 w-3 transition-transform", showApp && "rotate-90")} />
            {showApp ? "收起" : "米家App设置步骤"}
          </button>
        )}
        <AnimatePresence initial={false}>
          {showApp && auto.appSteps && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="overflow-hidden"
            >
              <div className="mt-2 ml-5 space-y-1 text-[10px] text-muted-foreground/70">
                {auto.appSteps.map((s, j) => (
                  <div key={j} className="flex items-start gap-1.5">
                    <span className="shrink-0 w-4 h-4 flex items-center justify-center rounded-full bg-muted/50 text-[9px] font-semibold text-muted-foreground mt-px">{j + 1}</span>
                    {s}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
