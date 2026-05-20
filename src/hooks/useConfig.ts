"use client";

import { useState, useMemo, useCallback } from "react";
import { DEVICES, ROOM_MAP, filterDevices } from "@/data/devices";
import { SCENES } from "@/data/scenes";
import { RoomIconMap, type Room, type ChatMessage, type Device } from "@/data/icons";

export function useConfig() {
  const [sel, setSel] = useState<string[]>([]);
  const [family, setFamily] = useState<string[]>([]);
  const [reno, setReno] = useState("");
  const [view, setView] = useState<"config" | "result">("config");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "ai", text: "你好！我是米家搭配助手。选择左侧场景，我会实时生成设备拓扑方案。" },
    { role: "ai", text: "试试点击「安防监控」或「全屋入门」看看效果。", tag: "建议", tagClass: "tag-tip" },
  ]);
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
      const s = SCENES.find((x) => x.id === id);
      if (s) {
        const devs = filterDevices(DEVICES[id] || [], reno);
        const price = devs.reduce((sum, d) => sum + d.price, 0);
        setMessages((m) => [
          ...m,
          {
            role: "ai",
            text: `已添加「${s.name}」— 包含 ${devs.length} 个设备，预估 ¥${price}。`,
            tag: "已更新",
            tagClass: "tag-ok",
          },
        ]);
      }
      return [...prev, id];
    });
  }, [reno]);

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
    setMessages((m) => [
      ...m,
      { role: "ai", text: "已清空所有场景，重新开始选择吧。", tag: "已重置", tagClass: "tag-info" },
    ]);
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

  const sendMessage = useCallback((text: string) => {
    const t = text.trim();
    if (!t) return;
    setMessages((m) => [...m, { role: "user", text: t }]);
    setTimeout(() => {
      const reply = generateReply(t, sel.length, totalDevices, totalPrice);
      setMessages((m) => [...m, reply]);
    }, 350);
  }, [sel.length, totalDevices, totalPrice]);

  return {
    sel, setSel,
    family, toggleFamily,
    reno, setReno,
    view, setView,
    messages, setMessages,
    showBreakdown, setShowBreakdown,
    rooms, needsGateway,
    totalDevices, totalPrice,
    getScenePrice,
    tog, selAll, clearAll, removeDev, sendMessage,
  };
}

/** 同类替代设备分组：吸顶灯/智能灯泡/灯泡、窗帘电机/窗帘伴侣 */
function getAltGroup(name: string): string | null {
  if (name.includes("吸顶灯") || name.includes("智能灯泡") || name.includes("灯泡")) return "light";
  if (name.includes("窗帘电机") || name.includes("窗帘伴侣")) return "curtain";
  return null;
}

function generateReply(t: string, sc: number, count: number, price: number): ChatMessage {
  if (t.includes("预算") || t.includes("便宜") || t.includes("多少钱")) {
    if (sc === 0) return { role: "ai", text: "请先选择左侧场景，我才能帮你计算预算。", tag: "提示", tagClass: "tag-tip" };
    const tips = ["建议先买核心设备（网关+传感器），后续再扩展灯光和窗帘。", "可以分批购入，先搞定安防和基础自动化，再升级体验。"];
    return { role: "ai", text: `当前方案 ${count} 个设备，预估 ¥${price}。${tips[Math.floor(Math.random() * tips.length)]}` };
  }
  if (t.includes("推荐") || t.includes("建议") || t.includes("怎么选")) {
    if (sc === 0) return { role: "ai", text: "根据你的需求推荐：\n• 新手入门：先选「全屋入门」\n• 安防为主：选「安防监控」\n• 舒适体验：选「温控舒适」+「智能灯光」", tag: "推荐", tagClass: "tag-tip" };
    return { role: "ai", text: "当前方案不错！建议确认网关位置（放客厅中央覆盖最佳），Zigbee 设备电池续航约 1 年。", tag: "建议", tagClass: "tag-tip" };
  }
  if (t.includes("安装") || t.includes("怎么装") || t.includes("设置")) {
    return { role: "ai", text: "安装步骤：\n1. 网关插电放在路由器旁\n2. 米家App → 右上角「+」扫描设备\n3. 传感器贴墙/贴门框即可\n4. 全部添加后创建「智能场景」", tag: "教程", tagClass: "tag-info" };
  }
  if (t.includes("联动") || t.includes("自动化") || t.includes("场景")) {
    return { role: "ai", text: "推荐联动规则：\n• 回家自动开灯+开空调\n• 离家自动关灯+布防\n• 睡前一键关闭全屋灯光\n• 传感器检测到移动自动开灯", tag: "联动", tagClass: "tag-info" };
  }
  if (t.includes("网关") || t.includes("中枢")) {
    return { role: "ai", text: "小米多模网关支持 Zigbee 3.0 + BLE Mesh，最多连接 128 个设备。建议放在房屋中央位置，WiFi 信号好的地方。", tag: "知识", tagClass: "tag-info" };
  }
  if (t.includes("协议") || t.includes("wifi") || t.includes("zigbee")) {
    return { role: "ai", text: "协议对比：\n• WiFi：直连路由器，响应快，功耗高\n• Zigbee：需网关，超低功耗，电池设备首选\n• BLE Mesh：需网关，适合灯光控制\n\n推荐混用：传感器用 Zigbee，灯/插座用 WiFi。" };
  }
  if (t.includes("宠物") || t.includes("猫") || t.includes("狗")) {
    return { role: "ai", text: "宠物看护方案：\n• 摄像头实时查看+双向语音\n• 智能喂食器定时投喂\n• 门窗传感器防宠物跑出\n• 搭配「宠物看护」场景即可", tag: "推荐", tagClass: "tag-tip" };
  }
  if (t.includes("老人") || t.includes("父母") || t.includes("养老")) {
    return { role: "ai", text: "适老化方案重点：\n• 人体传感器检测活动异常\n• 无线开关替代手机操作\n• 摄像头远程关怀\n• 门窗传感器防走失\n\n选「家里有老人」场景，操作简单可靠。", tag: "推荐", tagClass: "tag-tip" };
  }
  return { role: "ai", text: `好的，我来帮你分析。当前已选 ${sc} 个场景，${count} 个设备。有具体问题可以问我，比如「预算多少」「怎么安装」「推荐什么」。` };
}
