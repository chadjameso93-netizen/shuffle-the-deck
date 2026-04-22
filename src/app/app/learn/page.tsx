import { getLatestSession } from "@/lib/server/workspace/get-latest-session";
import { hydrateSession } from "@/lib/server/workspace/hydrate-session";
import { mockLearnModule } from "@/lib/canonical/fixtures/learn-module.fixture";
import { resolveSafetyMode, getAllowedSurfaces, getUiIntensity } from "@/lib/server/safety";
import { SafetyModeBadge } from "@/components/shared/SafetyModeBadge";
import Link from "next/link";

export default async function Learn() {
  const session = await getLatestSession();
  const learnModule = session ? (await hydrateSession(session)).learnModule : mockLearnModule;

  if (!learnModule) {
    return (
      <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <h1>No active learn module.</h1>
        <Link href="/app/now">Return to Read</Link>
      </main>
    );
  }

  const mode = resolveSafetyMode({ analysis: undefined, session: session || undefined }); // Should ideally pass analysis
  const allowedSurfaces = getAllowedSurfaces(mode);
  const intensity = getUiIntensity(mode);

  if (!allowedSurfaces.includes("learn")) {
    return (
      <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <h1>Learn is unavailable in {mode} mode.</h1>
        <Link href="/app/now">Return to Read</Link>
      </main>
    );
  }

  return (
    <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <header style={{ marginBottom: "2rem", borderBottom: "1px solid #eee", paddingBottom: "1rem" }}>
        <Link href="/app/now" style={{ textDecoration: "none", color: "#000", fontWeight: "bold" }}>← Back to Read</Link>
        <div style={{ marginTop: "1rem" }}>
          <SafetyModeBadge mode={mode} />
          <h1>Learn / {learnModule.title}</h1>
        </div>
      </header>

      <section style={{ marginBottom: "2rem" }}>
        <h3>What this pattern is</h3>
        <p>{learnModule.whatThisPatternIs}</p>
      </section>

      {intensity.learn === "full" && (
        <>
          <section style={{ marginBottom: "2rem" }}>
            <h3>What usually goes wrong</h3>
            <p>{learnModule.whatUsuallyGoesWrong}</p>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h3>What pressure is doing</h3>
            <p>{learnModule.whatPressureIsDoing}</p>
          </section>
        </>
      )}

      <section style={{ marginBottom: "2rem", padding: "1rem", background: "#f9f9f9", borderRadius: "8px" }}>
        <h3>What helps</h3>
        <p>{learnModule.whatHelps}</p>
        <div style={{ marginTop: "1rem", padding: "1rem", background: "#fff", borderLeft: "4px solid #000" }}>
          <strong>One line to try:</strong>
          <p>"{learnModule.oneLineToTry}"</p>
        </div>
      </section>
    </main>
  );
}
