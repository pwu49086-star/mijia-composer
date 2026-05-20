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
    const lines = ["米家智能家居方案", "====================", ""];
    rooms.forEach((r) => {
      lines.push(`【${r.name}】 ¥${r.price}`);
      r.devices.forEach((d) => {
        lines.push(`  • ${d.name} — ¥${d.price} (${d.proto})`);
      });
      lines.push("");
    });
    if (needsGateway) lines.push("核心设备：多模网关 ¥169");
    lines.push(`总计：¥${totalPrice} / ${totalDevices} 个设备`);
    lines.push("");
    lines.push("—— 由米家搭配向导生成");
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "米家方案.txt";
    a.click();
    URL.revokeObjectURL(a.href);
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
