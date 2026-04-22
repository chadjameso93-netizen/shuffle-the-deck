"use client";

import { useState } from "react";
import { CanvasScene } from "@/lib/canonical/types/canvas";
import { SharedAnalysis } from "@/lib/canonical/types/analysis";
import { CardExpressionState } from "@/lib/canonical/enums/cards";
import { SafetyMode } from "@/lib/canonical/enums/safety";
import { recomposeScene } from "@/lib/server/canvas/recompose-scene";
import { UiIntensity } from "@/lib/server/safety/get-ui-intensity";
import { SafetyModeBadge } from "@/components/shared/SafetyModeBadge";
import Link from "next/link";

export default function CanvasClientUI({
  initialScene,
  analysis,
  intensity,
  mode,
}: {
  initialScene: CanvasScene;
  analysis: SharedAnalysis;
  intensity: UiIntensity;
  mode: SafetyMode;
}) {
  const [scene, setScene] = useState<CanvasScene>(initialScene);
  const focusCardInit = initialScene.cards.find(c => c.id === initialScene.focusCardId);
  const [previewExpression, setPreviewExpression] = useState<CardExpressionState>(
    focusCardInit?.expressionState as CardExpressionState || CardExpressionState.DEFENDED
  );

  const focusCard = scene.cards.find(c => c.id === scene.focusCardId);
  const secondaryCard = scene.cards.find(c => c.id !== scene.focusCardId);

  const handleLock = () => {
    if (!scene.focusCardId) return;
    const newScene = recomposeScene({
      analysis,
      currentScene: scene,
      cardId: scene.focusCardId,
      chosenExpressionState: previewExpression,
    });
    setScene(newScene);
  };

  const isSimplified = intensity.canvas === "simplified";

  return (
    <main style={{ display: "flex", height: "100vh", fontFamily: "sans-serif" }}>
      {/* Left: Stage */}
      <div style={{ flex: 2, background: "#fafafa", position: "relative", borderRight: "1px solid #ccc" }}>
        <header style={{ padding: "1rem", position: "absolute", top: 0, left: 0, width: "100%" }}>
          <Link href="/app/now" style={{ textDecoration: "none", color: "#000", fontWeight: "bold" }}>← Back to Read</Link>
          <div style={{ marginTop: "1rem" }}>
            <SafetyModeBadge mode={mode} />
            <h2>Canvas / {scene.sceneType}</h2>
          </div>
        </header>

        {/* Stage Visualization */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", gap: "4rem" }}>
          {focusCard && (
            <div style={{ 
              padding: "2rem", 
              border: `2px solid ${previewExpression === "defended" ? "red" : previewExpression === "aligned" ? "blue" : "#333"}`, 
              borderRadius: "8px",
              background: "#fff",
              boxShadow: isSimplified ? "none" : (previewExpression === "defended" ? "0 0 20px rgba(255,0,0,0.2)" : "none"),
              transition: isSimplified ? "none" : "all 0.3s ease"
            }}>
              <h3>{focusCard.roleLabel} (Focus)</h3>
              <p>State: <strong>{previewExpression}</strong></p>
              {!isSimplified && (
                <p>Pressure: {previewExpression === "defended" ? focusCard.pressureIntensity : previewExpression === "adaptive" ? focusCard.pressureIntensity - 3 : 0}</p>
              )}
            </div>
          )}
          
          {!isSimplified && secondaryCard && (
            <>
              <div style={{ height: "2px", width: "100px", background: "#ccc", position: "relative" }}>
                <div style={{ position: "absolute", top: "-20px", left: "20px", fontSize: "12px" }}>
                  {scene.connections[0]?.connectionType} ({scene.connections[0]?.tension})
                </div>
              </div>
              <div style={{ padding: "2rem", border: "2px dashed #999", borderRadius: "8px", opacity: 0.7 }}>
                <h3>{secondaryCard.roleLabel}</h3>
                <p>State: {secondaryCard.expressionState}</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right: Inspector */}
      <div style={{ flex: 1, padding: "2rem", display: "flex", flexDirection: "column", gap: "2rem" }}>
        {isSimplified ? (
          <div>
            <h3>Scrubbing Disabled</h3>
            <p>Expression scrubbing is locked in Throttled mode to prevent overwhelming feedback loops.</p>
          </div>
        ) : (
          <div>
            <h3>Expression Scrubber</h3>
            <select 
              value={previewExpression} 
              onChange={(e) => setPreviewExpression(e.target.value as CardExpressionState)}
              style={{ padding: "0.5rem", width: "100%", marginTop: "0.5rem" }}
            >
              <option value="defended">Defended</option>
              <option value="adaptive">Adaptive</option>
              <option value="aligned">Aligned</option>
              <option value="gift">Gift</option>
            </select>
            <button 
              onClick={handleLock}
              style={{ marginTop: "1rem", padding: "0.5rem 1rem", background: "#000", color: "#fff", border: "none", cursor: "pointer", width: "100%" }}
            >
              Lock Expression
            </button>
          </div>
        )}

        <div style={{ padding: "1rem", background: "#eee", borderRadius: "8px" }}>
          <h4>What Changed</h4>
          <p>{scene.whatChangedSummary || "Waiting for interaction..."}</p>
        </div>

        <div style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
          <h4>Next Action</h4>
          <p>{scene.nextActionCue || "Select an expression to begin."}</p>
        </div>
      </div>
    </main>
  );
}
