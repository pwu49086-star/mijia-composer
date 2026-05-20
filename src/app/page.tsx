"use client";

import { useConfig } from "@/hooks/useConfig";
import { useAI } from "@/hooks/useAI";
import { Topbar } from "@/components/Topbar";
import { ScenePanel } from "@/components/ScenePanel";
import { TopologyView } from "@/components/TopologyView";
import { ChatPanel } from "@/components/ChatPanel";
import { PriceBreakdown } from "@/components/PriceBreakdown";
import { ResultsPage } from "@/components/ResultsPage";

export default function Home() {
  const {
    sel,
    family, toggleFamily,
    reno, setReno,
    view, setView,
    showBreakdown, setShowBreakdown,
    rooms, needsGateway,
    totalDevices, totalPrice,
    getScenePrice,
    tog, selAll, clearAll,
  } = useConfig();

  const {
    messages,
    sendMessage,
    isTyping,
    apiKey,
    setApiKey,
    aiMode,
  } = useAI({ sel, rooms, needsGateway, totalDevices, totalPrice, reno, family });

  const exportPlan = () => {
    const renoLabel: Record<string, string> = { planning: "未装修", renovating: "装修中", lived: "已入住" };
    const protoLabel: Record<string, string> = { wifi: "WiFi", zigbee: "Zigbee", ble_mesh: "BLE Mesh" };
    const installLabel: Record<string, string> = { wired: "需布线", wireless: "无线安装", plug: "即插即用" };

    const html = `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><title>米家智能家居方案书</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:'PingFang SC','Microsoft YaHei',sans-serif;color:#1a1a1a;line-height:1.6;max-width:800px;margin:0 auto;padding:40px 32px}
  .header{text-align:center;border-bottom:3px solid #ff6700;padding-bottom:24px;margin-bottom:32px}
  .header h1{font-size:28px;color:#ff6700;margin-bottom:4px}
  .header .sub{font-size:13px;color:#999}
  .meta{display:flex;justify-content:center;gap:24px;margin-top:12px;font-size:13px;color:#666}
  .meta span{background:#fff5f0;padding:4px 12px;border-radius:99px}
  h2{font-size:18px;color:#ff6700;border-left:3px solid #ff6700;padding-left:10px;margin:28px 0 12px}
  .room-card{background:#fafafa;border-radius:12px;padding:16px 20px;margin-bottom:12px}
  .room-card .rname{font-size:16px;font-weight:700;margin-bottom:8px}
  .room-card .rtotal{float:right;font-size:20px;font-weight:800;color:#ff6700}
  table{width:100%;border-collapse:collapse;font-size:13px}
  th{text-align:left;padding:6px 8px;border-bottom:1px solid #e5e5e5;font-weight:600;color:#999;font-size:11px}
  td{padding:8px 8px;border-bottom:1px solid #f0f0f0}
  td.price{font-weight:700;color:#ff6700;text-align:right}
  .tag{display:inline-block;padding:1px 8px;border-radius:99px;font-size:11px;font-weight:600}
  .tag-wifi{background:#f0f0f0;color:#666}
  .tag-zigbee{background:#ecfdf5;color:#059669}
  .tag-mesh{background:#eff6ff;color:#2563eb}
  .tag-wired{background:#fffbeb;color:#d97706}
  .tag-wireless{background:#ecfdf5;color:#059669}
  .tag-plug{background:#eff6ff;color:#2563eb}
  .gateway{background:#fff5f0;border:2px dashed #ff6700;border-radius:12px;padding:12px 20px;text-align:center;color:#ff6700;font-weight:700;margin:12px 0}
  .total{text-align:right;font-size:24px;font-weight:800;color:#ff6700;margin-top:16px;padding-top:12px;border-top:2px solid #e5e5e5}
  .footer{text-align:center;color:#ccc;font-size:11px;margin-top:40px;padding-top:20px;border-top:1px solid #f0f0f0}
  @media print{body{padding:20px 24px}}
</style></head><body>
<div class="header">
  <h1>米家智能家居方案书</h1>
  <div class="sub">由米家搭配向导自动生成</div>
  <div class="meta">
    <span>${rooms.length} 个空间</span><span>${totalDevices} 个设备</span><span>${sel.length} 个场景</span>
    ${reno ? '<span>' + (renoLabel[reno] || reno) + '</span>' : ''}
  </div>
</div>

<h2>设备清单</h2>
${rooms.map(r => `
<div class="room-card">
  <div class="rname">${r.name} <span class="rtotal">¥${r.price.toLocaleString()}</span></div>
  <table>
    <tr><th>设备</th><th>协议</th><th>安装</th><th>价格</th></tr>
    ${r.devices.map(d => `
    <tr>
      <td>${d.name}</td>
      <td><span class="tag tag-${d.proto==='wifi'?'wifi':d.proto==='zigbee'?'zigbee':'mesh'}">${protoLabel[d.proto]||d.proto}</span></td>
      <td><span class="tag tag-${d.install==='wired'?'wired':d.install==='wireless'?'wireless':'plug'}">${installLabel[d.install||'plug']}</span></td>
      <td class="price">¥${d.price}</td>
    </tr>`).join('')}
  </table>
</div>`).join('')}

${needsGateway ? '<div class="gateway">📡 多模网关（必需）— ¥169</div>' : ''}

<div class="total">总计：¥${totalPrice.toLocaleString()}</div>

<h2>安装顺序建议</h2>
<ol style="padding-left:20px;font-size:13px;color:#555">
  ${needsGateway ? '<li style="margin:4px 0"><strong>安装网关</strong> — 插电放在房屋中央，米家App扫码添加</li>' : ''}
  <li style="margin:4px 0"><strong>添加传感器</strong> — 撕背胶贴在对应位置，自动发现</li>
  <li style="margin:4px 0"><strong>安装灯具</strong> — 吸顶灯关闸接线 / 智能灯泡拧入灯座</li>
  <li style="margin:4px 0"><strong>安装窗帘</strong> — 电机固定轨道 / 伴侣夹挂</li>
  <li style="margin:4px 0"><strong>插电设备</strong> — 插座/摄像头/空调伴侣即插即用</li>
  <li style="margin:4px 0"><strong>创建智能场景</strong> — 米家App「智能」页面添加联动规则</li>
</ol>

<div class="footer">由米家搭配向导生成 · Xiaomi Mijia Smart Home</div>
</body></html>`;

    const w = window.open("", "_blank");
    if (w) {
      w.document.write(html);
      w.document.close();
      setTimeout(() => w.print(), 500);
    }
  };

  const goToResult = () => setView("result");
  const goToConfig = () => setView("config");

  if (view === "result") {
    return (
      <ResultsPage
        rooms={rooms}
        needsGateway={needsGateway}
        totalDevices={totalDevices}
        totalPrice={totalPrice}
        selectedScenes={sel}
        renovation={reno}
        onBack={goToConfig}
        onExport={exportPlan}
      />
    );
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Topbar onExport={goToResult} />

      <div className="flex flex-1 overflow-hidden">
        <ScenePanel
          sel={sel}
          tog={tog}
          selAll={selAll}
          family={family}
          toggleFamily={toggleFamily}
          reno={reno}
          setReno={setReno}
          getScenePrice={getScenePrice}
        />

        <TopologyView
          rooms={rooms}
          needsGateway={needsGateway}
          totalDevices={totalDevices}
          totalPrice={totalPrice}
          sceneCount={sel.length}
          onShowBreakdown={() => setShowBreakdown(true)}
          onClear={clearAll}
          onExport={goToResult}
        />

        <ChatPanel
          messages={messages}
          onSend={sendMessage}
          isTyping={isTyping}
          aiMode={aiMode}
          apiKey={apiKey}
          onApiKeyChange={setApiKey}
        />
      </div>

      <PriceBreakdown
        open={showBreakdown}
        onOpenChange={setShowBreakdown}
        rooms={rooms}
        needsGateway={needsGateway}
        totalPrice={totalPrice}
        onExport={goToResult}
      />
    </div>
  );
}
