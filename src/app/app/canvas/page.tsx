import { getLatestSession } from "@/lib/server/workspace/get-latest-session";
import { hydrateSession } from "@/lib/server/workspace/hydrate-session";
import { mockCanvasScene } from "@/lib/canonical/fixtures/canvas-scene.fixture";
import { mockSharedAnalysis } from "@/lib/canonical/fixtures/shared-analysis.fixture";
import { resolveSafetyMode, getAllowedSurfaces, getUiIntensity } from "@/lib/server/safety";
import CanvasClientUI from "./CanvasClientUI";
import Link from "next/link";

export default async function CanvasPage() {
  const session = await getLatestSession();
  const hydrated = session ? await hydrateSession(session) : null;
  
  const scene = hydrated?.canvasScene || mockCanvasScene;
  const analysis = hydrated?.sharedAnalysis || mockSharedAnalysis;

  const mode = resolveSafetyMode({ analysis });
  const allowedSurfaces = getAllowedSurfaces(mode);
  const intensity = getUiIntensity(mode);

  if (!allowedSurfaces.includes("canvas")) {
    return (
      <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <h1>Canvas is unavailable in {mode} mode.</h1>
        <Link href="/app/now">Return to Read</Link>
      </main>
    );
  }

  return <CanvasClientUI initialScene={scene} analysis={analysis} intensity={intensity} mode={mode} />;
}
