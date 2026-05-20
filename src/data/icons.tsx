import {
  Home, Camera, Lock, Thermometer, Moon, KeyRound, PawPrint, Star,
  Plug, Zap, Speaker, Flame, Droplets, Wifi, Radio, Cpu, Lightbulb,
  DoorOpen, type LucideProps,
} from "lucide-react";
import type { ComponentType } from "react";

// Lucide icons mapped to our device types
export const IconMap: Record<string, ComponentType<LucideProps>> = {
  router: Wifi,
  gateway: Cpu,
  sensor: Zap,
  camera: Camera,
  light: Lightbulb,
  lock: Lock,
  door: DoorOpen,
  temp: Thermometer,
  home: Home,
  moon: Moon,
  key: KeyRound,
  paw: PawPrint,
  star: Star,
  plug: Plug,
  switch: Zap,
  speaker: Speaker,
  curtain: Radio,
  ac: Thermometer,
  feeder: Droplets,
  humidifier: Droplets,
  robot: Cpu,
  smoke: Flame,
  water: Droplets,
};

// Scene icon mapping
export const SceneIconMap: Record<string, ComponentType<LucideProps>> = {
  lighting: Lightbulb,
  security: Lock,
  climate: Thermometer,
  sleep: Moon,
  away: KeyRound,
  arrival: KeyRound,
  movie: Star,
  morning: Home,
  guest: Speaker,
  pet: PawPrint,
  fullhome: Home,
  fullhouse: Star,
};

// Room icon mapping
export const RoomIconMap: Record<string, ComponentType<LucideProps>> = {
  "客厅": Lightbulb,
  "门口": DoorOpen,
  "卧室": Moon,
  "全屋": Home,
  "厨房": Flame,
};

export type DeviceProto = "wifi" | "zigbee" | "ble_mesh";

export interface Device {
  id: string;
  icon: string;
  name: string;
  proto: DeviceProto;
  price: number;
  image?: string;
  install?: "wired" | "wireless" | "plug";
}

export interface Scene {
  id: string;
  name: string;
  icon: string;
  price: number;
  items: string;
}

export interface Room {
  id: string;
  name: string;
  icon: string;
  devices: Device[];
  price: number;
  open: boolean;
}

export interface ChatMessage {
  role: "ai" | "user";
  text: string;
  tag?: string;
  tagClass?: string;
}
