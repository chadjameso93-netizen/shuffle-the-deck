import { getLatestSession } from "@/lib/server/workspace/get-latest-session";
import { hydrateSession } from "@/lib/server/workspace/hydrate-session";
import { mockSharedAnalysis } from "@/lib/canonical/fixtures/shared-analysis.fixture";
import { resolveSafetyMode, getAllowedSurfaces, getUiIntensity } from "@/lib/server/safety";
import { SafetyModeBadge } from "@/components/shared/SafetyModeBadge";
import Link from "next/link";

export default async function Now() {
  const session = await getLatestSession();
  const analysis = session ? (await hydrateSession(session)).sharedAnalysis : mockSharedAnalysis;

  const mode = resolveSafetyMode({ analysis });
  const allowedSurfaces = getAllowedSurfaces(mode);
  const intensity = getUiIntensity(mode);

  return (
    <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <header style={{ marginBottom: "2rem", borderBottom: "1px solid #eee", paddingBottom: "1rem" }}>
        <SafetyModeBadge mode={mode} />
        <h1>DEFRAG / Now</h1>
        <p>Canonical Analysis ID: {analysis.id}</p>
      </header>

      <section style={{ marginBottom: "2rem" }}>
        <h2>What is happening</h2>
        <p><strong>Read:</strong> {analysis.summary.oneLineRead}</p>
        <p>{analysis.summary.whatIsHappening}</p>
        {intensity.depth !== "bounded" && (
          <p><em>{analysis.summary.howItMayBeLanding}</em></p>
        )}
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Active Loop: {analysis.activeLoop.label}</h2>
        {intensity.depth !== "bounded" && <p>Shape: {analysis.activeLoop.relationalShape}</p>}
        <code>{analysis.activeLoop.description}</code>
      </section>

      <section style={{ marginBottom: "2rem", padding: "1rem", background: "#f9f9f9", borderRadius: "8px" }}>
        <h3>Role Active Now: {analysis.userState.roleLabel}</h3>
        <p>Expression: <strong>{analysis.userState.expressionState}</strong></p>
        <p>Pressure: {analysis.userState.pressureLabel}</p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Clean Move</h2>
        <p><strong>Move:</strong> {analysis.recommendation.cleanMove}</p>
        <p><strong>Try saying:</strong> "{analysis.recommendation.openingLine}"</p>
        {intensity.depth !== "bounded" && (
          <p style={{ color: "red" }}><strong>Avoid:</strong> {analysis.recommendation.whatNotToDo}</p>
        )}
      </section>

      {intensity.depth === "full" && analysis.branchCues.length > 0 && (
        <section style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid #ddd", borderRadius: "8px" }}>
          <h3>Branch Suggestions</h3>
          <ul>
            {analysis.branchCues.map((cue, i) => <li key={i}>{cue}</li>)}
          </ul>
        </section>
      )}

      <div style={{ display: "flex", gap: "1rem", marginTop: "3rem" }}>
        {allowedSurfaces.includes("canvas") ? (
          <Link href="/app/canvas" style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "8px", textDecoration: "none", color: "inherit", flex: 1 }}>
            <h3>Open Canvas</h3>
            <p>Scene Type: {analysis.sceneHints.sceneType}</p>
          </Link>
        ) : (
          <div style={{ padding: "1rem", border: "1px dashed #ccc", borderRadius: "8px", flex: 1, opacity: 0.5 }}>
            <h3>Canvas Unavailable</h3>
            <p>Not accessible in current safety mode.</p>
          </div>
        )}
        
        {allowedSurfaces.includes("learn") && (
          <Link href="/app/learn" style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "8px", textDecoration: "none", color: "inherit", flex: 1 }}>
            <h3>Learn Pattern</h3>
            <p>{analysis.learnHints.title}</p>
          </Link>
        )}
      </div>
    </main>
  );
}
