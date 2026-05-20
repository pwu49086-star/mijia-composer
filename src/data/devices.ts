import type { Device } from "./icons";

/**
 * 米家智能设备数据库
 *
 * 数据来源：miot_devices_clean.json（13,918台真实设备数据）
 * 筛选品牌：小米/米家、Yeelight、Aqara(绿米)、欧普、云米、智米、创米、石头、猫猫狗狗
 * 按12大场景分组，每场景精选3-5款代表性设备
 * 价格参考米家商城市场零售价（RMB）
 */

export const DEVICES: Record<string, Device[]> = {
  // ============ 智能灯光场景 ============
  lighting: [
    {
      id: "li1",
      icon: "light",
      name: "欧普智能吸顶灯",
      proto: "wifi",
      price: 299,
      install: "wired",
    },
    {
      id: "li1w",
      icon: "light",
      name: "Yeelight 智能灯泡",
      proto: "wifi",
      price: 49,
      install: "wireless",
    },
    {
      id: "li2",
      icon: "light",
      name: "Yeelight 智能射灯",
      proto: "wifi",
      price: 129,
      install: "wired",
    },
    {
      id: "li3",
      icon: "light",
      name: "Aqara RGB 彩光灯",
      proto: "zigbee",
      price: 199,
      install: "wired",
    },
    {
      id: "li4",
      icon: "switch",
      name: "小米智能开关 Pro",
      proto: "wifi",
      price: 159,
      install: "wired",
    },
  ],

  // ============ 安防监控场景 ============
  security: [
    {
      id: "se1",
      icon: "camera",
      name: "创米智能摄像头",
      proto: "wifi",
      price: 199,
      install: "wireless",
    },
    {
      id: "se2",
      icon: "lock",
      name: "小米智能门锁 Pro",
      proto: "wifi",
      price: 1299,
      install: "wired",
    },
    {
      id: "se3",
      icon: "smoke",
      name: "Aqara 烟雾报警器",
      proto: "zigbee",
      price: 149,
      install: "wireless",
    },
    {
      id: "se4",
      icon: "door",
      name: "Aqara 门窗传感器",
      proto: "zigbee",
      price: 69,
      install: "wireless",
    },
    {
      id: "se5",
      icon: "smoke",
      name: "Aqara 天然气报警器",
      proto: "zigbee",
      price: 179,
      install: "wireless",
    },
  ],

  // ============ 温控舒适场景 ============
  climate: [
    {
      id: "cl1",
      icon: "temp",
      name: "Aqara 温湿度传感器",
      proto: "zigbee",
      price: 69,
      install: "wireless",
    },
    {
      id: "cl2",
      icon: "ac",
      name: "Aqara 空调伴侣",
      proto: "zigbee",
      price: 279,
      install: "plug",
    },
    {
      id: "cl3",
      icon: "ac",
      name: "小米智能空调",
      proto: "wifi",
      price: 2299,
      install: "wired",
    },
    {
      id: "cl4",
      icon: "humidifier",
      name: "智米空气净化器",
      proto: "wifi",
      price: 799,
      install: "plug",
    },
    {
      id: "cl5",
      icon: "temp",
      name: "Aqara 温湿度传感器 Pro",
      proto: "zigbee",
      price: 99,
      install: "wireless",
    },
  ],

  // ============ 睡眠模式场景 ============
  sleep: [
    {
      id: "sl1",
      icon: "light",
      name: "欧普智能吸顶灯",
      proto: "wifi",
      price: 299,
      install: "wired",
    },
    {
      id: "sl1w",
      icon: "light",
      name: "Yeelight 智能灯泡",
      proto: "wifi",
      price: 49,
      install: "wireless",
    },
    {
      id: "sl2",
      icon: "curtain",
      name: "Aqara 窗帘电机",
      proto: "zigbee",
      price: 499,
      install: "wired",
    },
    {
      id: "sl2w",
      icon: "curtain",
      name: "Yeelight 智能窗帘电机",
      proto: "wifi",
      price: 599,
      install: "wired",
    },
    {
      id: "sl3",
      icon: "light",
      name: "Aqara 智能吸顶灯",
      proto: "zigbee",
      price: 259,
      install: "wired",
    },
  ],

  // ============ 离家布防场景 ============
  away: [
    {
      id: "aw1",
      icon: "gateway",
      name: "Aqara 多模网关 M1S",
      proto: "zigbee",
      price: 169,
      install: "plug",
    },
    {
      id: "aw2",
      icon: "sensor",
      name: "Aqara 人体传感器",
      proto: "zigbee",
      price: 89,
      install: "wireless",
    },
    {
      id: "aw3",
      icon: "plug",
      name: "小米智能插座",
      proto: "wifi",
      price: 49,
      install: "plug",
    },
    {
      id: "aw4",
      icon: "door",
      name: "Aqara 门窗传感器",
      proto: "zigbee",
      price: 69,
      install: "wireless",
    },
    {
      id: "aw5",
      icon: "sensor",
      name: "小米人体传感器",
      proto: "wifi",
      price: 59,
      install: "wireless",
    },
  ],

  // ============ 回家联动场景 ============
  arrival: [
    {
      id: "ar1",
      icon: "sensor",
      name: "Aqara 人体传感器",
      proto: "zigbee",
      price: 89,
      install: "wireless",
    },
    {
      id: "ar2",
      icon: "light",
      name: "欧普智能吸顶灯",
      proto: "wifi",
      price: 299,
      install: "wired",
    },
    {
      id: "ar2w",
      icon: "light",
      name: "Yeelight 智能灯泡",
      proto: "wifi",
      price: 49,
      install: "wireless",
    },
    {
      id: "ar3",
      icon: "ac",
      name: "Aqara 空调伴侣",
      proto: "zigbee",
      price: 279,
      install: "plug",
    },
    {
      id: "ar4",
      icon: "light",
      name: "Yeelight 风扇灯",
      proto: "wifi",
      price: 399,
      install: "wired",
    },
  ],

  // ============ 影院模式场景 ============
  movie: [
    {
      id: "mv1",
      icon: "light",
      name: "Yeelight 智能射灯",
      proto: "wifi",
      price: 129,
      install: "wired",
    },
    {
      id: "mv2",
      icon: "curtain",
      name: "Aqara 窗帘电机",
      proto: "zigbee",
      price: 499,
      install: "wired",
    },
    {
      id: "mv3",
      icon: "light",
      name: "Aqara RGB 彩光灯",
      proto: "zigbee",
      price: 199,
      install: "wired",
    },
    {
      id: "mv3w",
      icon: "light",
      name: "Yeelight 智能灯泡",
      proto: "wifi",
      price: 49,
      install: "wireless",
    },
    {
      id: "mv4",
      icon: "light",
      name: "欧普智能吸顶灯",
      proto: "wifi",
      price: 299,
      install: "wired",
    },
  ],

  // ============ 起床模式场景 ============
  morning: [
    {
      id: "mo1",
      icon: "curtain",
      name: "Aqara 窗帘电机",
      proto: "zigbee",
      price: 499,
      install: "wired",
    },
    {
      id: "mo1w",
      icon: "curtain",
      name: "Yeelight 智能窗帘电机",
      proto: "wifi",
      price: 599,
      install: "wired",
    },
    {
      id: "mo2",
      icon: "light",
      name: "Aqara 智能吸顶灯",
      proto: "zigbee",
      price: 259,
      install: "wired",
    },
    {
      id: "mo2w",
      icon: "light",
      name: "Yeelight 智能灯泡",
      proto: "wifi",
      price: 49,
      install: "wireless",
    },
    {
      id: "mo3",
      icon: "speaker",
      name: "小爱音箱",
      proto: "wifi",
      price: 149,
      install: "plug",
    },
  ],

  // ============ 会客模式场景 ============
  guest: [
    {
      id: "gu1",
      icon: "light",
      name: "欧普智能吸顶灯",
      proto: "wifi",
      price: 299,
      install: "wired",
    },
    {
      id: "gu1w",
      icon: "light",
      name: "Yeelight 智能灯泡",
      proto: "wifi",
      price: 49,
      install: "wireless",
    },
    {
      id: "gu2",
      icon: "ac",
      name: "Aqara 空调伴侣",
      proto: "zigbee",
      price: 279,
      install: "plug",
    },
    {
      id: "gu3",
      icon: "speaker",
      name: "小爱音箱 Pro",
      proto: "wifi",
      price: 299,
      install: "plug",
    },
    {
      id: "gu4",
      icon: "light",
      name: "Yeelight 风扇灯",
      proto: "wifi",
      price: 499,
      install: "wired",
    },
  ],

  // ============ 宠物看护场景 ============
  pet: [
    {
      id: "pe1",
      icon: "camera",
      name: "创米智能摄像头",
      proto: "wifi",
      price: 199,
      install: "wireless",
    },
    {
      id: "pe2",
      icon: "feeder",
      name: "猫猫狗狗智能喂食器",
      proto: "wifi",
      price: 299,
      install: "plug",
    },
    {
      id: "pe3",
      icon: "water",
      name: "猫猫狗狗宠物饮水机",
      proto: "wifi",
      price: 199,
      install: "plug",
    },
    {
      id: "pe4",
      icon: "sensor",
      name: "Aqara 人体传感器",
      proto: "zigbee",
      price: 89,
      install: "wireless",
    },
  ],

  // ============ 全屋入门套餐 ============
  fullhome: [
    {
      id: "fh1",
      icon: "gateway",
      name: "Aqara 多模网关 M1S",
      proto: "zigbee",
      price: 169,
      install: "plug",
    },
    {
      id: "fh2",
      icon: "speaker",
      name: "小爱音箱",
      proto: "wifi",
      price: 149,
      install: "plug",
    },
    {
      id: "fh3",
      icon: "sensor",
      name: "Aqara 人体传感器",
      proto: "zigbee",
      price: 89,
      install: "wireless",
    },
    {
      id: "fh4",
      icon: "plug",
      name: "小米智能插座",
      proto: "wifi",
      price: 49,
      install: "plug",
    },
    {
      id: "fh5",
      icon: "door",
      name: "Aqara 门窗传感器",
      proto: "zigbee",
      price: 69,
      install: "wireless",
    },
  ],

  // ============ 全屋旗舰套餐 ============
  fullhouse: [
    {
      id: "fhs1",
      icon: "gateway",
      name: "Aqara 多模网关 M1S",
      proto: "zigbee",
      price: 169,
      install: "plug",
    },
    {
      id: "fhs2",
      icon: "speaker",
      name: "小爱音箱 Pro",
      proto: "wifi",
      price: 299,
      install: "plug",
    },
    {
      id: "fhs3",
      icon: "light",
      name: "欧普智能吸顶灯 x3",
      proto: "wifi",
      price: 897,
      install: "wired",
    },
    {
      id: "fhs3w",
      icon: "light",
      name: "Yeelight 智能灯泡 x3",
      proto: "wifi",
      price: 147,
      install: "wireless",
    },
    {
      id: "fhs4",
      icon: "sensor",
      name: "Aqara 人体传感器 x2",
      proto: "zigbee",
      price: 178,
      install: "wireless",
    },
    {
      id: "fhs5",
      icon: "door",
      name: "Aqara 门窗传感器 x2",
      proto: "zigbee",
      price: 138,
      install: "wireless",
    },
    {
      id: "fhs6",
      icon: "camera",
      name: "创米智能摄像头",
      proto: "wifi",
      price: 199,
      install: "wireless",
    },
    {
      id: "fhs7",
      icon: "curtain",
      name: "Aqara 窗帘电机 x2",
      proto: "zigbee",
      price: 998,
      install: "wired",
    },
    {
      id: "fhs7w",
      icon: "curtain",
      name: "Yeelight 智能窗帘电机 x2",
      proto: "wifi",
      price: 1198,
      install: "wired",
    },
    {
      id: "fhs8",
      icon: "ac",
      name: "Aqara 空调伴侣 x2",
      proto: "zigbee",
      price: 558,
      install: "plug",
    },
    {
      id: "fhs9",
      icon: "plug",
      name: "小米智能插座 x3",
      proto: "wifi",
      price: 147,
      install: "plug",
    },
    {
      id: "fhs10",
      icon: "switch",
      name: "小米智能开关 Pro x2",
      proto: "wifi",
      price: 318,
      install: "wired",
    },
    {
      id: "fhs11",
      icon: "smoke",
      name: "Aqara 烟雾报警器",
      proto: "zigbee",
      price: 149,
      install: "wireless",
    },
    {
      id: "fhs12",
      icon: "temp",
      name: "Aqara 温湿度传感器",
      proto: "zigbee",
      price: 69,
      install: "wireless",
    },
    {
      id: "fhs13",
      icon: "light",
      name: "Aqara RGB 彩光灯",
      proto: "zigbee",
      price: 199,
      install: "wired",
    },
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
          if (!seen.has(d.name)) {
            seen.add(d.name);
            result.push(d);
          }
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
        if (!seen.has(d.name)) {
          seen.add(d.name);
          result.push(d);
        }
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
