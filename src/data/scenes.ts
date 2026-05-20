import type { Scene } from "./icons";
import { DEVICES } from "./devices";

function calcPrice(id: string): number {
  return (DEVICES[id] || []).reduce((s, d) => s + d.price, 0);
}

export const SCENES: Scene[] = [
  { id: "lighting", name: "智能灯光", icon: "lighting", price: calcPrice("lighting"), items: "吸顶灯 + 灯带 + 氛围灯" },
  { id: "security", name: "安防监控", icon: "security", price: calcPrice("security"), items: "摄像头 + 门窗传感 + 烟雾报警" },
  { id: "climate", name: "温控舒适", icon: "climate", price: calcPrice("climate"), items: "温湿度计 + 空调伴侣" },
  { id: "sleep", name: "睡眠模式", icon: "sleep", price: calcPrice("sleep"), items: "关灯 + 关窗帘 + 开空调" },
  { id: "away", name: "离家布防", icon: "away", price: calcPrice("away"), items: "自动关灯 + 开安防 + 通知" },
  { id: "arrival", name: "回家联动", icon: "arrival", price: calcPrice("arrival"), items: "自动开灯 + 开空调 + 欢迎语" },
  { id: "movie", name: "影院模式", icon: "movie", price: calcPrice("movie"), items: "关灯 + 关窗帘 + 氛围灯" },
  { id: "morning", name: "起床模式", icon: "morning", price: calcPrice("morning"), items: "开窗帘 + 开灯 + 播报天气" },
  { id: "guest", name: "会客模式", icon: "guest", price: calcPrice("guest"), items: "全屋灯 + 空调 + 音乐" },
  { id: "pet", name: "宠物看护", icon: "pet", price: calcPrice("pet"), items: "摄像头 + 喂食器 + 传感器" },
  { id: "fullhome", name: "全屋入门", icon: "fullhome", price: calcPrice("fullhome"), items: "网关 + 小爱 + 传感器 + 插座" },
  { id: "fullhouse", name: "全屋旗舰", icon: "fullhouse", price: calcPrice("fullhouse"), items: "全品类设备一步到位" },
];

export const FAMILY_OPTS = [
  { v: "elder", t: "老人" },
  { v: "child", t: "小孩" },
  { v: "pet", t: "宠物" },
  { v: "couple", t: "两人" },
  { v: "alone", t: "独居" },
];

export const RENO_OPTS = [
  { v: "planning", t: "还没装修", tip: "推荐有线方案" },
  { v: "renovating", t: "装修中", tip: "推荐有线方案" },
  { v: "lived", t: "已入住", tip: "推荐无线方案" },
];
