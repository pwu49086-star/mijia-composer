/** 自动化场景配置模板 */
export const AUTOMATION_TEMPLATES: Record<string, {
  name: string;
  icon: string;
  trigger: string;
  conditions?: string[];
  actions: string[];
  voice?: string;
  appSteps?: string[];
}> = {
  lighting: {
    name: "智能灯光",
    icon: "light",
    trigger: "手动 / 语音",
    actions: ["打开吸顶灯", "设置亮度 80%", "设置色温 4000K"],
    voice: "小爱同学，开灯",
    appSteps: ["米家App → 智能 → 添加场景", "条件：手动执行", "动作：吸顶灯 → 开灯 → 亮度80%"],
  },
  security: {
    name: "安防监控",
    icon: "camera",
    trigger: "门窗传感器触发 / 移动侦测",
    conditions: ["离家模式开启"],
    actions: ["摄像头开始录像", "手机推送报警通知", "小爱音箱播报警报"],
    appSteps: ["米家App → 智能 → 添加场景", "条件：门窗传感器 → 打开", "动作：摄像头 → 开始录像", "动作：发送通知"],
  },
  climate: {
    name: "温控舒适",
    icon: "temp",
    trigger: "温湿度 > 28°C",
    actions: ["自动开启空调", "设置温度 26°C", "设置制冷模式"],
    appSteps: ["米家App → 智能 → 添加场景", "条件：温湿度计 → 温度 > 28°C", "动作：空调伴侣 → 开空调 → 26°C"],
  },
  sleep: {
    name: "睡眠模式",
    icon: "moon",
    trigger: "语音 / 定时 22:00",
    actions: ["关闭吸顶灯", "关闭窗帘", "开启空调 26°C", "小爱音箱播放白噪音"],
    voice: "小爱同学，我要睡觉了",
    appSteps: ["米家App → 智能 → 添加场景", "条件：定时 22:00 / 语音触发", "动作：吸顶灯 → 关灯", "动作：窗帘电机 → 关闭", "动作：空调 → 26°C"],
  },
  away: {
    name: "离家布防",
    icon: "key",
    trigger: "人体传感器 30 分钟无人",
    conditions: ["所有门窗已关闭"],
    actions: ["关闭全屋灯光", "开启摄像头监控", "开启门窗传感器报警", "手机推送通知"],
    appSteps: ["米家App → 智能 → 添加场景", "条件：人体传感器 → 30分钟无人", "动作：全屋灯 → 关闭", "动作：摄像头 → 开启监控"],
  },
  arrival: {
    name: "回家联动",
    icon: "key",
    trigger: "人体传感器检测到人",
    conditions: ["离家模式已开启"],
    actions: ["打开玄关灯", "打开空调", "小爱音箱播报欢迎语"],
    voice: "小爱同学，我回来了",
    appSteps: ["米家App → 智能 → 添加场景", "条件：人体传感器 → 检测到人", "动作：玄关灯 → 开灯", "动作：空调 → 开机"],
  },
  movie: {
    name: "影院模式",
    icon: "star",
    trigger: "语音",
    actions: ["关闭吸顶灯", "打开氛围灯", "关闭窗帘", "小爱音箱播放电影推荐"],
    voice: "小爱同学，影院模式",
    appSteps: ["米家App → 智能 → 添加场景", "条件：语音触发", "动作：吸顶灯 → 关灯", "动作：氛围灯 → 开灯", "动作：窗帘 → 关闭"],
  },
  morning: {
    name: "起床模式",
    icon: "home",
    trigger: "定时 7:00 / 语音",
    actions: ["打开窗帘 50%", "打开吸顶灯（暖光 30%）", "小爱音箱播报天气"],
    voice: "小爱同学，早上好",
    appSteps: ["米家App → 智能 → 添加场景", "条件：定时 7:00", "动作：窗帘 → 打开50%", "动作：吸顶灯 → 暖光30%"],
  },
  guest: {
    name: "会客模式",
    icon: "speaker",
    trigger: "语音",
    actions: ["打开全屋灯光", "空调设置 24°C", "小爱音箱播放轻音乐"],
    voice: "小爱同学，会客模式",
    appSteps: ["米家App → 智能 → 添加场景", "条件：语音触发", "动作：全屋灯 → 开灯", "动作：空调 → 24°C"],
  },
  pet: {
    name: "宠物看护",
    icon: "paw",
    trigger: "定时 / 手动",
    actions: ["摄像头开启实时监控", "喂食器定时投喂 8:00/18:00", "人体传感器检测异常推送"],
    appSteps: ["米家App → 智能 → 添加场景", "条件：定时 8:00 / 18:00", "动作：喂食器 → 投喂一份", "动作：摄像头 → 开启监控"],
  },
  fullhome: {
    name: "全屋入门",
    icon: "home",
    trigger: "语音 / 手动",
    actions: ["一句话控制所有设备", "离家自动布防", "回家自动开灯"],
    appSteps: ["米家App → 智能 → 添加场景", "创建离家/回家两个场景", "添加语音控制"],
  },
  fullhouse: {
    name: "全屋旗舰",
    icon: "star",
    trigger: "全自动",
    actions: ["全屋设备联动", "根据时间自动调节", "异常自动报警"],
    appSteps: ["米家App → 智能 → 添加场景", "创建多个自动化规则", "设置时间触发条件"],
  },
};
