import { NextRequest, NextResponse } from "next/server";
import { AnalyzeInputEnvelopeSchema } from "@/lib/server/analyze/input-envelope";
import { buildSharedAnalysis } from "@/lib/server/analyze/build-shared-analysis";
import { buildInitialCanvasScene } from "@/lib/server/analyze/build-initial-canvas-scene";
// import { buildLearnModule } from "@/lib/server/analyze/build-learn-module";
import { saveSharedAnalysis, saveCanvasScene, saveWorkspaceSession } from "@/lib/server/persistence";
import { generateCanonicalId } from "@/lib/canonical/utils/ids";
import { mockLearnModule } from "@/lib/canonical/fixtures/learn-module.fixture";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = AnalyzeInputEnvelopeSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json({ error: "Invalid input envelope", details: parseResult.error }, { status: 400 });
    }

    const input = parseResult.data;

    // 1. Staged Pipeline Build
    const sharedAnalysis = await buildSharedAnalysis(input);

    // 2. Deterministic Canvas Scene Derivation
    const canvasScene = buildInitialCanvasScene(sharedAnalysis);

    // 3. Learn Module Derivation
    const learnModule = mockLearnModule; // Scaffolded. Normally buildLearnModule(sharedAnalysis)

    // 4. Persistence
    // In strict environments, we try/catch persistence so the request still completes if DB isn't migrated
    try {
      await saveSharedAnalysis(sharedAnalysis);
      await saveCanvasScene(canvasScene, sharedAnalysis.id);
      
      if (input.workspaceSessionId) {
        await saveWorkspaceSession({
          id: input.workspaceSessionId,
          latestAnalysisId: sharedAnalysis.id,
          latestSceneId: canvasScene.id,
          latestLearnModuleId: learnModule.id,
          activeSurface: input.requestedSurface || "main",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }
    } catch (e) {
      console.warn("Persistence failed during /api/analyze. Returning ephemeral response.", e);
    }

    // 5. Canonical Response
    return NextResponse.json({
      requestId: generateCanonicalId("analysis"),
      safetyDecision: sharedAnalysis.safetyDecision,
      sharedAnalysis,
      canvasScene,
      learnModule,
    });
  } catch (error) {
    console.error("Analysis pipeline failed:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
