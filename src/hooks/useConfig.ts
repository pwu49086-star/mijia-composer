"use client";

import { useState, useMemo, useCallback } from "react";
import { DEVICES, ROOM_MAP, filterDevices } from "@/data/devices";
import { SCENES } from "@/data/scenes";
import type { Room } from "@/data/icons";

export function useConfig() {
  const [sel, setSel] = useState<string[]>([]);
  const [family, setFamily] = useState<string[]>([]);
  const [reno, setReno] = useState("");
  const [view, setView] = useState<"config" | "result">("config");
  const [showBreakdown, setShowBreakdown] = useState(false);

  const rooms = useMemo<Room[]>(() => {
    const map: Record<string, Room> = {};
    sel.forEach((sid) => {
      const rawDevs = DEVICES[sid] || [];
      const devs = filterDevices(rawDevs, reno);
      const roomName = ROOM_MAP[sid] || "其他";
      if (!map[roomName]) {
        map[roomName] = {
          id: roomName,
          name: roomName,
          icon: roomName,
          devices: [],
          price: 0,
          open: true,
        };
      }
      devs.forEach((d) => {
        // 去重：同名设备 或 同类替代设备（吸顶灯/智能灯泡、窗帘电机/窗帘伴侣）
        const isDuplicate = map[roomName].devices.some((ex) => {
          if (ex.name === d.name) return true;
          const altGroup = getAltGroup(ex.name);
          return altGroup && altGroup === getAltGroup(d.name);
        });
        if (!isDuplicate) {
          map[roomName].devices.push(d);
          map[roomName].price += d.price;
        }
      });
    });
    return Object.values(map);
  }, [sel, reno]);

  const needsGateway = useMemo(() => {
    return sel.some((id) =>
      (DEVICES[id] || []).some((d) => d.proto === "zigbee" || d.proto === "ble_mesh")
    );
  }, [sel]);

  const totalDevices = useMemo(() => {
    return rooms.reduce((n, r) => n + r.devices.length, 0);
  }, [rooms]);

  const totalPrice = useMemo(() => {
    const base = rooms.reduce((s, r) => s + r.price, 0);
    return needsGateway ? base + 169 : base;
  }, [rooms, needsGateway]);

  const tog = useCallback((id: string) => {
    setSel((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      }
      return [...prev, id];
    });
  }, []);

  const toggleFamily = useCallback((v: string) => {
    setFamily((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]));
  }, []);

  const selAll = useCallback(() => {
    setSel((prev) =>
      prev.length === SCENES.length ? [] : SCENES.map((s) => s.id)
    );
  }, []);

  const clearAll = useCallback(() => {
    setSel([]);
  }, []);

  const removeDev = useCallback((roomId: string, devId: string) => {
    // This triggers a re-render via the rooms computed
    // We need to store a custom removal state
    // For simplicity, we'll just filter in the UI
  }, []);

  const getScenePrice = useCallback((sceneId: string) => {
    const devs = filterDevices(DEVICES[sceneId] || [], reno);
    return devs.reduce((sum, d) => sum + d.price, 0);
  }, [reno]);

  return {
    sel, setSel,
    family, toggleFamily,
    reno, setReno,
    view, setView,
    showBreakdown, setShowBreakdown,
    rooms, needsGateway,
    totalDevices, totalPrice,
    getScenePrice,
    tog, selAll, clearAll, removeDev,
  };
}

/** 同类替代设备分组：吸顶灯/智能灯泡/灯泡、窗帘电机/窗帘伴侣 */
function getAltGroup(name: string): string | null {
  if (name.includes("吸顶灯") || name.includes("智能灯泡") || name.includes("灯泡")) return "light";
  if (name.includes("窗帘电机") || name.includes("窗帘伴侣")) return "curtain";
  return null;
}
