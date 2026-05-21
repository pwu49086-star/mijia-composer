<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/pwu49086-star/mijia-composer/main/public/og-dark.svg">
  <img alt="米家搭配向导" src="https://raw.githubusercontent.com/pwu49086-star/mijia-composer/main/public/og.svg" width="100%">
</picture>

# 米家搭配向导

**面向装修/刚入住用户的米家全屋智能方案配置工具，由 Claude Code 多 Agent 协作驱动开发。**

选择生活方式 → 自动生成设备清单 → 协议兼容校验 → 一键打印方案书。让用户告别"不知道该买什么设备、能不能联动、怎么安装"的选择焦虑。

> 全部代码由 Claude Code Agent 生成，零人工编码。Git 历史全程包含 `Co-Authored-By: Claude Opus 4.7`。

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-latest-000000?logo=shadcnui)](https://ui.shadcn.com)

## 核心能力

```
选择场景  ──→  房间自动分配  ──→  协议兼容检查  ──→  方案书导出
   │               │                  │                  │
   │               │                  │                  │
   ▼               ▼                  ▼                  ▼
12个生活场景     3种装修阶段       WiFi/Zigbee/BLE     购物清单+安装
灯光/安防/温控   没装修/装修中/    Mesh 自动配对      指南+自动化模板
睡眠/离家/回家   已入住适配       需网关提醒          +京东购买链接
影院/起床/会客                    有线/无线推荐       PDF一键导出
宠物/全屋方案                     
```

## 技术架构

| 层级 | 技术选型 |
|------|----------|
| 框架 | Next.js 16 + React 19 |
| 样式 | Tailwind CSS 4 + shadcn/ui |
| 动画 | Framer Motion |
| 图标 | Lucide React |
| AI | 规则引擎 + 可选 Claude API 注入（兼容模式降级） |
| 部署 | GitHub Pages 静态托管 |
| 数据 | 14,000+ 小米米家设备规格库 |

## 本地运行

```bash
npm install
npm run dev
```

## 静态构建 & 部署

```bash
npm run build
# 输出到 out/ 目录，可直接部署到任意静态服务器
```

## 项目结构

```
src/
├── app/               # Next.js App Router
│   ├── layout.tsx     # 根布局
│   ├── page.tsx       # 主页面
│   └── globals.css    # 全局样式 + Tailwind 配置
├── components/        # UI 组件
│   ├── ScenePanel.tsx       # 左侧：场景选择 + 偏好
│   ├── TopologyView.tsx     # 中央：房间设备拓扑
│   ├── ChatPanel.tsx        # 右侧：AI 对话助手
│   ├── ResultsPage.tsx      # 方案确认页
│   ├── PriceBreakdown.tsx   # 价格明细弹窗
│   ├── SummaryBar.tsx       # 底部状态栏
│   ├── Topbar.tsx           # 顶部导航
│   ├── DeviceItem.tsx       # 设备卡片
│   └── RoomCard.tsx         # 房间卡片
├── data/               # 数据层
│   ├── devices.ts           # 设备库（82 个精选 SKU）
│   ├── scenes.ts            # 12 个场景定义 + 偏好选项
│   ├── automation.ts        # 自动化配置模板
│   ├── installGuide.ts      # 安装指南 + 安装顺序
│   └── icons.tsx            # 图标映射 + 类型定义
├── hooks/              # 状态管理
│   └── useConfig.ts         # 核心状态机
└── lib/                # 工具函数
    └── utils.ts             # cn() 样式合并
```

## License

MIT

---

<p align="center">
  <sub>Built with Claude Code · 14,000+ 小米设备数据驱动</sub>
</p>
