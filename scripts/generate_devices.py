#!/usr/bin/env python3
"""
generate_devices.py
Reads miot_devices_clean.json and generates src/data/devices.ts
with real device data filtered to Mijia ecosystem brands.
"""

import json
import os
from typing import Any

# Paths
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SCRIPT_DIR)
INPUT_JSON = os.path.join("D:", os.sep, "aftersale-system", "miot_devices_clean.json")
OUTPUT_TS = os.path.join(PROJECT_DIR, "src", "data", "devices.ts")

# Mijia ecosystem brands (lowercase)
MIJIA_BRANDS = {
    "xiaomi", "yeelink", "lumi", "opple",
    "viomi", "yunmi", "zhimi", "chuangmi",
    "miot", "roborock", "mmgg",
}

# Brand -> Chinese name mapping
BRAND_CN = {
    "xiaomi": "小米",
    "yeelink": "Yeelight",
    "lumi": "Aqara",
    "opple": "欧普",
    "viomi": "云米",
    "yunmi": "云米",
    "zhimi": "智米",
    "chuangmi": "创米",
    "miot": "米家",
    "roborock": "石头",
    "mmgg": "猫猫狗狗",
}

# Category -> default Chinese suffix
CATEGORY_SUFFIX = {
    "light": "智能灯",
    "switch": "智能开关",
    "outlet": "智能插座",
    "curtain": "窗帘电机",
    "camera": "智能摄像头",
    "lock": "智能门锁",
    "speaker": "智能音箱",
    "gateway": "网关",
    "sensor": "传感器",
    "smoke-sensor": "烟雾报警器",
    "gas-sensor": "天然气报警器",
    "magnet-sensor": "门窗传感器",
    "motion-sensor": "人体传感器",
    "temperature-humidity-sensor": "温湿度传感器",
    "illumination-sensor": "光照传感器",
    "vibration-sensor": "振动传感器",
    "air-conditioner": "空调伴侣",
    "air-purifier": "空气净化器",
    "heater": "暖风机",
    "humidifier": "加湿器",
    "vacuum": "扫地机器人",
    "feeder": "智能喂食器",
    "pet-drinking-fountain": "宠物饮水机",
    "water-purifier": "净水器",
    "fan": "风扇",
    "hood": "油烟机",
    "bath-heater": "浴霸",
    "washer": "洗衣机",
    "fridge": "冰箱",
    "water-heater": "热水器",
    "cooker": "电饭煲",
    "kettle": "电水壶",
    "airer": "晾衣架",
    "air-fresh": "新风机",
    "air-monitor": "空气检测仪",
    "television": "电视",
    "projector": "投影仪",
}

# Category -> install type
CATEGORY_INSTALL = {
    "light": "wired",
    "switch": "wired",
    "outlet": "plug",
    "curtain": "wired",
    "camera": "wireless",
    "lock": "wired",
    "speaker": "plug",
    "gateway": "plug",
    "sensor": "wireless",
    "smoke-sensor": "wireless",
    "gas-sensor": "wireless",
    "magnet-sensor": "wireless",
    "motion-sensor": "wireless",
    "temperature-humidity-sensor": "wireless",
    "illumination-sensor": "wireless",
    "vibration-sensor": "wireless",
    "air-conditioner": "plug",
    "air-purifier": "plug",
    "heater": "plug",
    "humidifier": "plug",
    "vacuum": "plug",
    "feeder": "plug",
    "pet-drinking-fountain": "plug",
    "water-purifier": "plug",
    "fan": "plug",
    "hood": "wired",
    "bath-heater": "wired",
    "washer": "plug",
    "fridge": "plug",
    "water-heater": "plug",
    "cooker": "plug",
    "kettle": "plug",
    "airer": "wired",
    "air-fresh": "wired",
    "air-monitor": "plug",
    "television": "plug",
    "projector": "plug",
}

# Category -> icon mapping
CATEGORY_ICON = {
    "light": "light",
    "switch": "switch",
    "outlet": "plug",
    "curtain": "curtain",
    "camera": "camera",
    "lock": "lock",
    "speaker": "speaker",
    "gateway": "gateway",
    "smoke-sensor": "smoke",
    "gas-sensor": "smoke",
    "magnet-sensor": "door",
    "motion-sensor": "sensor",
    "temperature-humidity-sensor": "temp",
    "illumination-sensor": "sensor",
    "vibration-sensor": "sensor",
    "air-conditioner": "ac",
    "air-purifier": "humidifier",
    "heater": "ac",
    "humidifier": "humidifier",
    "vacuum": "robot",
    "feeder": "feeder",
    "pet-drinking-fountain": "water",
    "water-purifier": "water",
    "fan": "ac",
    "hood": "switch",
    "bath-heater": "ac",
    "washer": "plug",
    "fridge": "plug",
    "water-heater": "water",
    "cooker": "plug",
    "kettle": "plug",
    "airer": "curtain",
    "air-fresh": "humidifier",
    "air-monitor": "sensor",
    "television": "speaker",
    "projector": "speaker",
}

# Well-known brand weight (higher = prioritized for selection)
BRAND_WEIGHT = {
    "xiaomi": 10,
    "lumi": 9,
    "yeelink": 8,
    "opple": 7,
    "zhimi": 6,
    "chuangmi": 6,
    "roborock": 6,
    "viomi": 5,
    "yunmi": 5,
    "mmgg": 4,
    "miot": 3,
}

# Scene definitions: scene_key -> [(category, min_count, max_count)]
SCENE_CATEGORIES = {
    "lighting":     [("light", 3, 5), ("switch", 1, 2)],
    "security":     [("camera", 1, 1), ("lock", 1, 1), ("smoke-sensor", 1, 1), ("magnet-sensor", 1, 1), ("gas-sensor", 0, 1)],
    "climate":      [("temperature-humidity-sensor", 1, 2), ("air-conditioner", 1, 1), ("air-purifier", 0, 1), ("heater", 0, 1)],
    "sleep":        [("light", 2, 3), ("curtain", 1, 2)],
    "away":         [("gateway", 1, 1), ("motion-sensor", 1, 2), ("outlet", 1, 1), ("magnet-sensor", 0, 1)],
    "arrival":      [("motion-sensor", 1, 1), ("light", 2, 3), ("air-conditioner", 1, 1)],
    "movie":        [("light", 2, 4), ("curtain", 1, 1)],
    "morning":      [("curtain", 1, 2), ("light", 2, 2), ("speaker", 1, 1)],
    "guest":        [("light", 2, 3), ("air-conditioner", 1, 1), ("speaker", 1, 1)],
    "pet":          [("camera", 1, 1), ("feeder", 1, 1), ("pet-drinking-fountain", 0, 1), ("motion-sensor", 0, 1)],
    "fullhome":     [("gateway", 1, 1), ("speaker", 1, 1), ("motion-sensor", 1, 1), ("outlet", 1, 1), ("magnet-sensor", 0, 1)],
    "fullhouse":    [
        ("gateway", 1, 1), ("speaker", 1, 1), ("light", 3, 4),
        ("motion-sensor", 2, 2), ("magnet-sensor", 2, 2), ("camera", 1, 1),
        ("curtain", 2, 2), ("air-conditioner", 2, 2), ("outlet", 3, 3),
        ("switch", 2, 2), ("smoke-sensor", 1, 1), ("temperature-humidity-sensor", 1, 1),
    ],
}

# Reasonable market prices for device categories (RMB)
PRICE_MAP = {
    "light": {"small": 49, "ceiling": 299, "strip": 79, "default": 199},
    "switch": {"default": 159},
    "outlet": {"default": 49},
    "curtain": {"default": 499},
    "camera": {"default": 199},
    "lock": {"default": 1299},
    "speaker": {"basic": 149, "pro": 299, "default": 149},
    "gateway": {"default": 169},
    "motion-sensor": {"default": 89},
    "smoke-sensor": {"default": 149},
    "gas-sensor": {"default": 179},
    "magnet-sensor": {"default": 69},
    "temperature-humidity-sensor": {"basic": 69, "pro": 99},
    "illumination-sensor": {"default": 69},
    "vibration-sensor": {"default": 79},
    "air-conditioner": {"companion": 279, "full": 2299, "default": 279},
    "air-purifier": {"default": 799},
    "heater": {"default": 399},
    "humidifier": {"default": 299},
    "vacuum": {"default": 1999},
    "feeder": {"default": 299},
    "pet-drinking-fountain": {"default": 199},
}


def load_devices(path: str) -> list[dict]:
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def filter_mijia(devices: list[dict]) -> list[dict]:
    """Filter to Mijia ecosystem brands only"""
    return [d for d in devices if d.get("brand", "").lower() in MIJIA_BRANDS]


def make_chinese_name(d: dict) -> str:
    """Generate a human-readable Chinese name from device data"""
    brand = d.get("brand", "").lower()
    model = d.get("model", "")
    category = d.get("category", "")

    brand_cn = BRAND_CN.get(brand, brand)

    # Special patterns based on model
    if "yeelink.light.fancl" in model:
        return f"{brand_cn} 风扇灯"
    if "yeelink.light.meshbulb" in model:
        return f"{brand_cn} 智能灯泡"
    if "yeelink.light.spot1" in model:
        return f"{brand_cn} 智能射灯"
    if "yeelink.light.dnlight" in model:
        return f"{brand_cn} 筒灯"
    if "yeelink.curtain" in model:
        return f"{brand_cn} 智能窗帘电机"
    if "opple.light.ceiling" in model:
        return f"{brand_cn}智能吸顶灯"
    if "opple.light.desk" in model:
        return f"{brand_cn}智能台灯"
    if "lumi.light.rgbac" in model:
        return f"{brand_cn} RGB 彩光灯"
    if "lumi.light.bacn" in model or "lumi.light.jwcn" in model:
        return f"{brand_cn} 智能吸顶灯"
    if "lumi.light.wcn" in model:
        return f"{brand_cn} 筒射灯"
    if "lumi.curtain" in model:
        return f"{brand_cn} 窗帘电机"
    if "lumi.sensor_ht" in model or "lumi.weather" in model:
        if "pro" in model.lower() or "erv1" in model:
            return f"{brand_cn} 温湿度传感器 Pro"
        return f"{brand_cn} 温湿度传感器"
    if "lumi.sensor_magnet" in model:
        return f"{brand_cn} 门窗传感器"
    if "lumi.sensor_smoke" in model:
        return f"{brand_cn} 烟雾报警器"
    if "lumi.sensor_gas" in model:
        return f"{brand_cn} 天然气报警器"
    if "lumi.motion" in model:
        return f"{brand_cn} 人体传感器"
    if "lumi.sen_ill" in model:
        return f"{brand_cn} 光照传感器"
    if "lumi.vibration" in model:
        return f"{brand_cn} 振动传感器"
    if "lumi.gateway" in model:
        if "mgl03" in model:
            return f"{brand_cn} 多模网关 M1S"
        return f"{brand_cn} 网关"
    if "lumi.aircondition" in model:
        return f"{brand_cn} 空调伴侣"
    if "lumi.switch" in model:
        return f"{brand_cn} 智能开关"
    if "lumi.plug" in model:
        return f"{brand_cn} 智能插座"
    if "xiaomi.wifispeaker.l05b" in model or "xiaomi.wifispeaker.l09b" in model:
        return f"小爱音箱"
    if "xiaomi.wifispeaker.l05c" in model:
        return f"小爱音箱"
    if "xiaomi.wifispeaker.x08e" in model or "xiaomi.wifispeaker.x10a" in model:
        return f"小爱音箱 Pro"
    if "xiaomi.wifispeaker.l15a" in model:
        return f"小爱音箱"
    if "xiaomi.plug" in model:
        return f"小米智能插座"
    if "xiaomi.switch" in model:
        return f"小米智能开关 Pro"
    if "xiaomi.aircondition" in model:
        return f"小米智能空调"
    if "xiaomi.lock" in model:
        return f"小米智能门锁 Pro"
    if "xiaomi.motion" in model:
        return f"小米人体传感器"
    if "chuangmi.camera" in model:
        return f"{brand_cn}智能摄像头"
    if "chuangmi.curtain" in model:
        return f"{brand_cn}窗帘电机"
    if "chuangmi.plug" in model:
        return f"{brand_cn}智能插座"
    if "chuangmi.switch" in model:
        return f"{brand_cn}智能开关"
    if "mmgg.feeder" in model:
        return f"{brand_cn}智能喂食器"
    if "mmgg.pet_waterer" in model:
        return f"{brand_cn}宠物饮水机"
    if "zhimi.airpurifier" in model:
        return f"{brand_cn}空气净化器"
    if "zhimi.heater" in model:
        return f"{brand_cn}暖风机"
    if "zhimi.humidifier" in model:
        return f"{brand_cn}加湿器"
    if "roborock.vacuum" in model:
        return f"{brand_cn}扫地机器人"
    if "viomi.aircondition" in model:
        return f"{brand_cn}智能空调"
    if "viomi.curtain" in model:
        return f"{brand_cn}窗帘电机"

    # Fallback: brand + category suffix
    suffix = CATEGORY_SUFFIX.get(category, "")
    return f"{brand_cn}{suffix}"


def get_price(category: str, model: str) -> int:
    """Get estimated market price"""
    if "ceiling" in model.lower():
        return PRICE_MAP["light"].get("ceiling", 299)
    if "bulb" in model.lower() or "meshbulb" in model.lower():
        return PRICE_MAP["light"].get("small", 49)
    if "strip" in model.lower() or "lightstrip" in model.lower():
        return PRICE_MAP["light"].get("strip", 79)

    if category in PRICE_MAP:
        pm = PRICE_MAP[category]
        if category == "air-conditioner":
            if "companion" in model.lower() or "lumi" in model.lower():
                return pm.get("companion", 279)
            return pm.get("full", 2299)
        if category == "temperature-humidity-sensor":
            if "pro" in model.lower():
                return pm.get("pro", 99)
            return pm.get("basic", 69)
        return pm.get("default", 199)

    return 99  # fallback


def get_install(category: str) -> str:
    return CATEGORY_INSTALL.get(category, "plug")


def get_icon(category: str) -> str:
    return CATEGORY_ICON.get(category, "plug")


def select_devices_for_scene(
    devices: list[dict],
    categories: list[tuple[str, int, int]],
) -> list[dict]:
    """Select best devices for a scene"""
    by_cat: dict[str, list[dict]] = {}
    for d in devices:
        cat = d.get("category", "")
        if cat not in by_cat:
            by_cat[cat] = []
        by_cat[cat].append(d)

    selected: list[dict] = []
    for cat, min_n, max_n in categories:
        candidates = by_cat.get(cat, [])
        # Sort by brand weight (higher = better)
        candidates.sort(
            key=lambda d: BRAND_WEIGHT.get(d.get("brand", "").lower(), 0),
            reverse=True,
        )
        # Deduplicate by name
        seen_names: set[str] = set()
        unique: list[dict] = []
        for d in candidates:
            name = make_chinese_name(d)
            if name not in seen_names:
                seen_names.add(name)
                unique.append(d)
        # Take top candidates respecting min/max
        n = min(len(unique), max_n)
        n = max(n, min_n)
        selected.extend(unique[:n])
        # Remove selected from candidates
        for d in unique[:n]:
            if d in candidates:
                candidates.remove(d)

    return selected


def generate_id(prefix: str, index: int, is_wireless_alt: bool = False) -> str:
    return f"{prefix}{index}{'w' if is_wireless_alt else ''}"


# Scene ID prefixes
SCENE_PREFIX = {
    "lighting": "li", "security": "se", "climate": "cl",
    "sleep": "sl", "away": "aw", "arrival": "ar",
    "movie": "mv", "morning": "mo", "guest": "gu",
    "pet": "pe", "fullhome": "fh", "fullhouse": "fhs",
}


def format_device(d: dict, scene_id: str, index: int, is_wireless_alt: bool = False) -> str:
    """Format a single device as TypeScript object literal"""
    name = make_chinese_name(d)
    if is_wireless_alt:
        # Append wireless alt suffix for names
        pass  # name stays same for pairing
    proto = d.get("protocol", "wifi")
    if proto not in ("wifi", "zigbee", "ble_mesh"):
        proto = "wifi"
    price = get_price(d.get("category", ""), d.get("model", ""))
    install = get_install(d.get("category", ""))
    icon = get_icon(d.get("category", ""))
    pid = generate_id(SCENE_PREFIX.get(scene_id, "xx"), index, is_wireless_alt)
    return (
        f'    {{\n'
        f'      id: "{pid}",\n'
        f'      icon: "{icon}",\n'
        f'      name: "{name}",\n'
        f'      proto: "{proto}",\n'
        f'      price: {price},\n'
        f'      install: "{install}",\n'
        f'    }}'
    )


def generate_wireless_pairs(selected: list[dict], scene_key: str) -> list[str]:
    """For devices with wired install that have a wireless alternative,
    generate paired wireless entries."""
    # Only generate wireless pairs for certain categories where it makes sense
    wireless_pair_cats = {"light", "curtain"}
    result: list[str] = []
    idx = len(selected) + 1

    for d in selected:
        cat = d.get("category", "")
        if cat not in wireless_pair_cats:
            continue
        install = get_install(cat)
        if install != "wired":
            continue
        # Generate a wireless alternative
        wireless_alt = dict(d)  # shallow copy
        result.append(format_device(wireless_alt, scene_key, idx, is_wireless_alt=True))
        idx += 1

    return result


def generate_devices_ts(devices: list[dict], output_path: str) -> None:
    """Generate the complete devices.ts file"""
    mijia = filter_mijia(devices)
    print(f"Filtered to {len(mijia)} Mijia ecosystem devices from {len(devices)} total")

    lines: list[str] = []
    lines.append('import type { Device } from "./icons";')
    lines.append("")
    lines.append("/**")
    lines.append(" * 米家智能设备数据库")
    lines.append(" *")
    lines.append(f" * 数据来源：miot_devices_clean.json（{len(devices)}台真实设备数据）")
    lines.append(" * 筛选品牌：小米/米家、Yeelight、Aqara(绿米)、欧普、云米、智米、创米、石头、猫猫狗狗")
    lines.append(" * 按12大场景分组，每场景精选3-5款代表性设备")
    lines.append(" * 价格参考米家商城市场零售价（RMB）")
    lines.append(" *")
    lines.append(" * 自动生成脚本: scripts/generate_devices.py")
    lines.append(" */")
    lines.append("")
    lines.append("export const DEVICES: Record<string, Device[]> = {")

    for scene_key in [
        "lighting", "security", "climate", "sleep", "away",
        "arrival", "movie", "morning", "guest", "pet",
        "fullhome", "fullhouse",
    ]:
        categories = SCENE_CATEGORIES[scene_key]
        selected = select_devices_for_scene(mijia, categories)

        # Generate wired + wireless pairs for certain categories
        wireless_entries = generate_wireless_pairs(selected, scene_key)

        scene_comment = SCENE_NAME.get(scene_key, scene_key)
        lines.append(f"  // ============ {scene_comment} ============")
        lines.append(f"  {scene_key}: [")

        # Format wired entries
        index = 1
        for d in selected:
            lines.append(format_device(d, scene_key, index) + ",")
            index += 1

        # Format wireless pair entries
        for entry in wireless_entries:
            lines.append(entry + ",")

        lines.append("  ],")
        lines.append("")

    lines.append("};")
    lines.append("")

    # ROOM_MAP
    lines.append("export const ROOM_MAP: Record<string, string> = {")
    lines.append('  lighting: "客厅",')
    lines.append('  security: "门口",')
    lines.append('  climate: "客厅",')
    lines.append('  sleep: "卧室",')
    lines.append('  away: "全屋",')
    lines.append('  arrival: "门口",')
    lines.append('  movie: "客厅",')
    lines.append('  morning: "卧室",')
    lines.append('  guest: "客厅",')
    lines.append('  pet: "客厅",')
    lines.append('  fullhome: "全屋",')
    lines.append('  fullhouse: "全屋",')
    lines.append("};")
    lines.append("")

    # filterDevices function
    lines.append("/**")
    lines.append(" * 根据装修阶段推荐设备")
    lines.append(" * 不做硬过滤，而是当有线/无线同时存在时，按阶段选一个推荐")
    lines.append(" */")
    lines.append("export function filterDevices(devices: Device[], reno: string): Device[] {")
    lines.append('  const preferWireless = reno === "lived";')
    lines.append("  const result: Device[] = [];")
    lines.append("  const seen = new Set<string>();")
    lines.append("")
    lines.append("  for (const d of devices) {")
    lines.append("    // 有线+无线成对时，根据阶段选一个")
    lines.append('    if (d.id.endsWith("w")) {')
    lines.append("      const wiredId = d.id.slice(0, -1);")
    lines.append("      const hasWired = devices.some((x) => x.id === wiredId);")
    lines.append("      if (hasWired) {")
    lines.append("        if (preferWireless) {")
    lines.append("          // 已入住：推荐无线版，跳过有线版")
    lines.append("          if (!seen.has(d.name)) {")
    lines.append("            seen.add(d.name);")
    lines.append("            result.push(d);")
    lines.append("          }")
    lines.append("        }")
    lines.append("        // 非已入住：跳过无线版，等有线版加入")
    lines.append("        continue;")
    lines.append("      }")
    lines.append("    }")
    lines.append("    // 有线版：如果已入住且有无线替代，跳过")
    lines.append('    if (!preferWireless && d.install === "wired") {')
    lines.append('      const wirelessAlt = devices.find((x) => x.id === d.id + "w");')
    lines.append("      if (wirelessAlt) {")
    lines.append("        // 有无线替代但不是已入住，选有线")
    lines.append("        if (!seen.has(d.name)) {")
    lines.append("          seen.add(d.name);")
    lines.append("          result.push(d);")
    lines.append("        }")
    lines.append("        continue;")
    lines.append("      }")
    lines.append("    }")
    lines.append("    if (!seen.has(d.name)) {")
    lines.append("      seen.add(d.name);")
    lines.append("      result.push(d);")
    lines.append("    }")
    lines.append("  }")
    lines.append("  return result;")
    lines.append("}")
    lines.append("")

    with open(output_path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))

    print(f"Generated: {output_path}")


SCENE_NAME = {
    "lighting": "智能灯光场景",
    "security": "安防监控场景",
    "climate": "温控舒适场景",
    "sleep": "睡眠模式场景",
    "away": "离家布防场景",
    "arrival": "回家联动场景",
    "movie": "影院模式场景",
    "morning": "起床模式场景",
    "guest": "会客模式场景",
    "pet": "宠物看护场景",
    "fullhome": "全屋入门套餐",
    "fullhouse": "全屋旗舰套餐",
}


def main():
    if not os.path.exists(INPUT_JSON):
        print(f"ERROR: Input file not found: {INPUT_JSON}")
        return

    devices = load_devices(INPUT_JSON)
    generate_devices_ts(devices, OUTPUT_TS)


if __name__ == "__main__":
    main()
