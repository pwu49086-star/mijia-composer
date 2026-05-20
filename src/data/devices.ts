import type { Device } from "./icons";

export const DEVICES: Record<string, Device[]> = {
  lighting: [
    { id: "l1", icon: "light", name: "吸顶灯", proto: "wifi", price: 299, install: "wired" },
    { id: "l1w", icon: "light", name: "智能灯泡", proto: "wifi", price: 49, install: "wireless" },
    { id: "l2", icon: "light", name: "灯带", proto: "ble_mesh", price: 79, install: "plug" },
    { id: "l3", icon: "light", name: "氛围灯", proto: "wifi", price: 129, install: "plug" },
  ],
  security: [
    { id: "s1", icon: "camera", name: "摄像头", proto: "wifi", price: 129, install: "wireless" },
    { id: "s2", icon: "door", name: "门窗传感器", proto: "zigbee", price: 69, install: "wireless" },
    { id: "s3", icon: "smoke", name: "烟雾报警器", proto: "zigbee", price: 149, install: "wireless" },
  ],
  climate: [
    { id: "cl1", icon: "temp", name: "温湿度计", proto: "zigbee", price: 69, install: "wireless" },
    { id: "cl2", icon: "ac", name: "空调伴侣", proto: "wifi", price: 279, install: "plug" },
  ],
  sleep: [
    { id: "sl1", icon: "light", name: "吸顶灯", proto: "wifi", price: 299, install: "wired" },
    { id: "sl1w", icon: "light", name: "智能灯泡", proto: "wifi", price: 49, install: "wireless" },
    { id: "sl2", icon: "curtain", name: "窗帘电机", proto: "zigbee", price: 499, install: "wired" },
    { id: "sl2w", icon: "curtain", name: "窗帘伴侣", proto: "ble_mesh", price: 199, install: "wireless" },
  ],
  away: [
    { id: "aw1", icon: "gateway", name: "多模网关", proto: "wifi", price: 169, install: "plug" },
    { id: "aw2", icon: "sensor", name: "人体传感器", proto: "zigbee", price: 89, install: "wireless" },
    { id: "aw3", icon: "plug", name: "智能插座", proto: "wifi", price: 39, install: "plug" },
  ],
  arrival: [
    { id: "ar1", icon: "sensor", name: "人体传感器", proto: "zigbee", price: 89, install: "wireless" },
    { id: "ar2", icon: "light", name: "吸顶灯", proto: "wifi", price: 299, install: "wired" },
    { id: "ar2w", icon: "light", name: "智能灯泡", proto: "wifi", price: 49, install: "wireless" },
    { id: "ar3", icon: "ac", name: "空调伴侣", proto: "wifi", price: 279, install: "plug" },
  ],
  movie: [
    { id: "mv1", icon: "light", name: "氛围灯", proto: "wifi", price: 129, install: "plug" },
    { id: "mv2", icon: "curtain", name: "窗帘电机", proto: "zigbee", price: 499, install: "wired" },
    { id: "mv2w", icon: "curtain", name: "窗帘伴侣", proto: "ble_mesh", price: 199, install: "wireless" },
    { id: "mv3", icon: "light", name: "吸顶灯", proto: "wifi", price: 299, install: "wired" },
    { id: "mv3w", icon: "light", name: "智能灯泡", proto: "wifi", price: 49, install: "wireless" },
  ],
  morning: [
    { id: "mo1", icon: "curtain", name: "窗帘电机", proto: "zigbee", price: 499, install: "wired" },
    { id: "mo1w", icon: "curtain", name: "窗帘伴侣", proto: "ble_mesh", price: 199, install: "wireless" },
    { id: "mo2", icon: "light", name: "吸顶灯", proto: "wifi", price: 299, install: "wired" },
    { id: "mo2w", icon: "light", name: "智能灯泡", proto: "wifi", price: 49, install: "wireless" },
    { id: "mo3", icon: "speaker", name: "小爱音箱", proto: "ble_mesh", price: 149, install: "plug" },
  ],
  guest: [
    { id: "gu1", icon: "light", name: "吸顶灯", proto: "wifi", price: 299, install: "wired" },
    { id: "gu1w", icon: "light", name: "智能灯泡", proto: "wifi", price: 49, install: "wireless" },
    { id: "gu2", icon: "ac", name: "空调伴侣", proto: "wifi", price: 279, install: "plug" },
    { id: "gu3", icon: "speaker", name: "小爱音箱", proto: "ble_mesh", price: 149, install: "plug" },
  ],
  pet: [
    { id: "p1", icon: "camera", name: "摄像头", proto: "wifi", price: 129, install: "wireless" },
    { id: "p2", icon: "feeder", name: "喂食器", proto: "wifi", price: 299, install: "plug" },
    { id: "p3", icon: "sensor", name: "人体传感器", proto: "zigbee", price: 89, install: "wireless" },
  ],
  fullhome: [
    { id: "f1", icon: "gateway", name: "多模网关", proto: "wifi", price: 169, install: "plug" },
    { id: "f2", icon: "speaker", name: "小爱音箱", proto: "ble_mesh", price: 149, install: "plug" },
    { id: "f3", icon: "sensor", name: "人体传感器", proto: "zigbee", price: 89, install: "wireless" },
    { id: "f4", icon: "plug", name: "智能插座", proto: "wifi", price: 39, install: "plug" },
  ],
  fullhouse: [
    { id: "fs1", icon: "gateway", name: "多模网关", proto: "wifi", price: 169, install: "plug" },
    { id: "fs2", icon: "speaker", name: "小爱音箱", proto: "ble_mesh", price: 149, install: "plug" },
    { id: "fs3", icon: "light", name: "吸顶灯 ×3", proto: "wifi", price: 897, install: "wired" },
    { id: "fs3w", icon: "light", name: "智能灯泡 ×3", proto: "wifi", price: 147, install: "wireless" },
    { id: "fs4", icon: "sensor", name: "人体传感器 ×2", proto: "zigbee", price: 178, install: "wireless" },
    { id: "fs5", icon: "door", name: "门窗传感器 ×2", proto: "zigbee", price: 138, install: "wireless" },
    { id: "fs6", icon: "camera", name: "摄像头", proto: "wifi", price: 129, install: "wireless" },
    { id: "fs7", icon: "curtain", name: "窗帘电机 ×2", proto: "zigbee", price: 998, install: "wired" },
    { id: "fs7w", icon: "curtain", name: "窗帘伴侣 ×2", proto: "ble_mesh", price: 398, install: "wireless" },
    { id: "fs8", icon: "ac", name: "空调伴侣 ×2", proto: "wifi", price: 558, install: "plug" },
    { id: "fs9", icon: "plug", name: "智能插座 ×3", proto: "wifi", price: 117, install: "plug" },
    { id: "fs10", icon: "switch", name: "无线开关 ×2", proto: "zigbee", price: 118, install: "wireless" },
    { id: "fs11", icon: "smoke", name: "烟雾报警器", proto: "zigbee", price: 149, install: "wireless" },
    { id: "fs12", icon: "temp", name: "温湿度计", proto: "zigbee", price: 69, install: "wireless" },
  ],
};

export const ROOM_MAP: Record<string, string> = {
  lighting: "客厅",
  security: "门口",
  climate: "客厅",
  sleep: "卧室",
  away: "全屋",
  arrival: "门口",
  movie: "客厅",
  morning: "卧室",
  guest: "客厅",
  pet: "客厅",
  fullhome: "全屋",
  fullhouse: "全屋",
};

/**
 * 根据装修阶段推荐设备
 * 不做硬过滤，而是当有线/无线同时存在时，按阶段选一个推荐
 */
export function filterDevices(devices: Device[], reno: string): Device[] {
  const preferWireless = reno === "lived";
  const result: Device[] = [];
  const seen = new Set<string>();

  for (const d of devices) {
    // 有线+无线成对时，根据阶段选一个
    if (d.id.endsWith("w")) {
      const wiredId = d.id.slice(0, -1);
      const hasWired = devices.some((x) => x.id === wiredId);
      if (hasWired) {
        if (preferWireless) {
          // 已入住：推荐无线版，跳过有线版
          if (!seen.has(d.name)) { seen.add(d.name); result.push(d); }
        }
        // 非已入住：跳过无线版，等有线版加入
        continue;
      }
    }
    // 有线版：如果已入住且有无线替代，跳过
    if (!preferWireless && d.install === "wired") {
      const wirelessAlt = devices.find((x) => x.id === d.id + "w");
      if (wirelessAlt) {
        // 有无线替代但不是已入住，选有线
        if (!seen.has(d.name)) { seen.add(d.name); result.push(d); }
        continue;
      }
    }
    if (!seen.has(d.name)) {
      seen.add(d.name);
      result.push(d);
    }
  }
  return result;
}
