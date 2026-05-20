"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Room } from "@/data/icons";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rooms: Room[];
  needsGateway: boolean;
  totalPrice: number;
  onExport: () => void;
}

export function PriceBreakdown({ open, onOpenChange, rooms, needsGateway, totalPrice, onExport }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md gap-0 p-0 overflow-hidden">
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          <DialogHeader className="border-b border-border px-5 py-4">
            <DialogTitle className="text-sm font-bold">方案价格明细</DialogTitle>
          </DialogHeader>

          <div className="max-h-[60vh] overflow-y-auto px-5 py-4">
            {rooms.map((room) => (
              <div key={room.id} className="mb-4 last:mb-0">
                <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {room.name}
                </div>
                {room.devices.map((d) => (
                  <div key={d.id} className="flex items-center justify-between border-b border-border/50 py-1.5 last:border-0">
                    <div>
                      <span className="text-[11px] font-medium text-foreground/80">{d.name}</span>
                      <span className="ml-1.5 text-[9px] text-muted-foreground">
                        {d.proto === "wifi" ? "WiFi" : d.proto === "zigbee" ? "Zigbee" : "Mesh"}
                      </span>
                    </div>
                    <span className="font-mono text-[11px] font-semibold text-indigo-500">¥{d.price}</span>
                  </div>
                ))}
              </div>
            ))}

            {needsGateway && (
              <div className="mb-4">
                <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">核心设备</div>
                <div className="flex items-center justify-between border-b border-border/50 py-1.5 last:border-0">
                  <div>
                    <span className="text-[11px] font-medium text-foreground/80">小米多模网关</span>
                    <span className="ml-1.5 text-[9px] text-muted-foreground">必需</span>
                  </div>
                  <span className="font-mono text-[11px] font-semibold text-indigo-500">¥169</span>
                </div>
              </div>
            )}

            <div className="mt-4 flex items-center justify-between border-t-2 border-border pt-3">
              <span className="text-sm font-bold">总计</span>
              <span className="font-mono text-xl font-extrabold text-indigo-500">¥{totalPrice}</span>
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t border-border px-5 py-3">
            <Button variant="outline" size="sm" className="h-8 text-[11px]" onClick={() => onOpenChange(false)}>
              关闭
            </Button>
            <Button size="sm" className="h-8 gap-1.5 bg-gradient-to-r from-indigo-500 to-violet-500 text-[11px] shadow-md shadow-indigo-500/20" onClick={onExport}>
              导出方案
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
