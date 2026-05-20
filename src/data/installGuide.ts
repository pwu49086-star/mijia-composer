/** 设备安装指南 */
export const INSTALL_GUIDE: Record<string, {
  title: string;
  steps: string[];
  time: string;
  difficulty: "easy" | "medium" | "hard";
  tips?: string[];
}> = {
  gateway: {
    title: "多模网关",
    time: "5 分钟",
    difficulty: "easy",
    steps: [
      "将网关插电，放置在房屋中央位置",
      "打开米家 App → 右上角「+」→ 扫描网关底部二维码",
      "等待蓝灯常亮，表示连接成功",
    ],
    tips: ["建议放在客厅，覆盖全屋", "最多连接 128 个 Zigbee/BLE Mesh 设备"],
  },
  speaker: {
    title: "小爱音箱",
    time: "3 分钟",
    difficulty: "easy",
    steps: [
      "插电开机，等待提示音",
      "米家 App →「+」→ 搜索「小爱音箱」→ 连接 WiFi",
      "绑定成功后设置默认房间",
    ],
    tips: ["支持语音控制所有米家设备", "可设置自定义唤醒词"],
  },
  camera: {
    title: "摄像头",
    time: "5 分钟",
    difficulty: "easy",
    steps: [
      "插电，等待指示灯闪烁",
      "米家 App →「+」→ 扫描摄像头底部二维码",
      "连接 WiFi，选择安装位置",
    ],
    tips: ["建议安装在 2 米以上高度", "支持移动侦测推送"],
  },
  sensor: {
    title: "人体传感器",
    time: "2 分钟",
    difficulty: "easy",
    steps: [
      "撕开背面 3M 贴纸",
      "贴在需要检测的区域（走廊/门口/床边）",
      "米家 App →「+」→ 自动发现 → 按提示添加",
    ],
    tips: ["检测距离约 5-7 米", "电池续航约 1 年"],
  },
  door: {
    title: "门窗传感器",
    time: "2 分钟",
    difficulty: "easy",
    steps: [
      "主体贴在门框/窗框上，磁铁贴在门/窗上",
      "两者间距不超过 15mm",
      "米家 App →「+」→ 自动发现 → 按提示添加",
    ],
    tips: ["贴之前先测试开合是否触发", "电池续航约 1 年"],
  },
  light: {
    title: "吸顶灯/灯泡",
    time: "15 分钟",
    difficulty: "medium",
    steps: [
      "关闭电源总闸",
      "拆下旧灯，按接线图连接零火线",
      "安装灯罩，打开电源",
      "米家 App →「+」→ 搜索灯具型号 → 按提示添加",
    ],
    tips: ["智能灯泡直接拧进灯座即可，无需布线", "支持色温/亮度调节"],
  },
  curtain: {
    title: "窗帘电机",
    time: "20 分钟",
    difficulty: "hard",
    steps: [
      "确认窗帘轨道类型（直轨/弯轨）",
      "安装电机支架，固定在轨道一端",
      "接通电源或安装电池版",
      "米家 App →「+」→ 搜索窗帘电机 → 按提示添加",
    ],
    tips: ["安装前确认轨道承重", "支持定时开合"],
  },
  plug: {
    title: "智能插座",
    time: "1 分钟",
    difficulty: "easy",
    steps: [
      "直接插在墙壁插座上",
      "米家 App →「+」→ 自动发现 → 按提示添加",
      "将电器插头插在智能插座上",
    ],
    tips: ["支持定时开关", "可查看用电量"],
  },
  temp: {
    title: "温湿度计",
    time: "1 分钟",
    difficulty: "easy",
    steps: [
      "撕开背面贴纸，贴在墙上或放在桌上",
      "米家 App →「+」→ 自动发现 → 按提示添加",
    ],
    tips: ["建议放在通风处，避免阳光直射", "电池续航约 1 年"],
  },
  ac: {
    title: "空调伴侣",
    time: "3 分钟",
    difficulty: "easy",
    steps: [
      "插在空调专用插座上",
      "将空调插头插在空调伴侣上",
      "米家 App →「+」→ 自动发现 → 按提示添加",
      "App 中选择空调品牌，自动匹配遥控器",
    ],
    tips: ["支持定时开关空调", "可联动温湿度计自动控温"],
  },
  switch: {
    title: "无线开关",
    time: "1 分钟",
    difficulty: "easy",
    steps: [
      "撕开背面贴纸，贴在床头/门口等方便位置",
      "米家 App →「+」→ 自动发现 → 按提示添加",
      "在 App 中设置按键触发的动作",
    ],
    tips: ["无需布线，电池供电", "支持单击/双击/长按三种动作"],
  },
  smoke: {
    title: "烟雾报警器",
    time: "3 分钟",
    difficulty: "easy",
    steps: [
      "安装在天花板上（距墙角 > 50cm）",
      "米家 App →「+」→ 自动发现 → 按提示添加",
    ],
    tips: ["建议每个房间安装一个", "触发时手机会收到推送"],
  },
  feeder: {
    title: "喂食器",
    time: "3 分钟",
    difficulty: "easy",
    steps: [
      "装入猫粮/狗粮，不超过 MAX 线",
      "插电，等待指示灯",
      "米家 App →「+」→ 搜索喂食器 → 按提示添加",
    ],
    tips: ["可设置定时投喂", "支持远程手动投喂"],
  },
  robot: {
    title: "扫拖机器人",
    time: "10 分钟",
    difficulty: "medium",
    steps: [
      "组装拖布和水箱",
      "充电桩插电，靠墙放置",
      "机器人开机，推入充电桩",
      "米家 App →「+」→ 搜索扫地机 → 按提示添加",
    ],
    tips: ["首次使用建议先全屋建图", "可设置禁区和清扫顺序"],
  },
  water: {
    title: "燃气报警器",
    time: "3 分钟",
    difficulty: "easy",
    steps: [
      "安装在燃气灶附近（距燃气管 1-3 米）",
      "米家 App →「+」→ 自动发现 → 按提示添加",
    ],
    tips: ["不要安装在通风口附近", "触发时手机会收到推送"],
  },
};

/** 安装顺序 — 按优先级排列 */
export const INSTALL_ORDER = [
  { step: 1, icon: "gateway", title: "安装网关", desc: "插电 → 米家App扫码 → 等蓝灯常亮", time: "5 分钟", difficulty: "easy" as const },
  { step: 2, icon: "speaker", title: "添加小爱音箱", desc: "插电 → 连WiFi → 绑定成功", time: "3 分钟", difficulty: "easy" as const },
  { step: 3, icon: "sensor", title: "添加无线传感器", desc: "人体/门窗/温湿度 → 自动发现", time: "2 分钟/个", difficulty: "easy" as const },
  { step: 4, icon: "light", title: "安装有线设备", desc: "吸顶灯/窗帘电机 → 关闸布线", time: "15-20 分钟/个", difficulty: "hard" as const },
  { step: 5, icon: "plug", title: "添加插电设备", desc: "插座/空调伴侣/摄像头 → 即插即用", time: "1-3 分钟/个", difficulty: "easy" as const },
  { step: 6, icon: "star", title: "创建智能场景", desc: "米家App → 智能 → 添加场景", time: "5 分钟", difficulty: "medium" as const },
];
