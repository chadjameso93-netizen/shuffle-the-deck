import { WorkspaceSession } from "../../canonical/types/session";
import { SharedAnalysis } from "../../canonical/types/analysis";
import { CanvasScene } from "../../canonical/types/canvas";
import { LearnModule } from "../../canonical/types/learn";
import { getSharedAnalysisById } from "../persistence/analysis";
import { getCanvasSceneById } from "../persistence/scenes";
import { getLearnModuleById } from "../persistence/learn";
import { mockSharedAnalysis } from "../../canonical/fixtures/shared-analysis.fixture";
import { mockCanvasScene } from "../../canonical/fixtures/canvas-scene.fixture";
import { mockLearnModule } from "../../canonical/fixtures/learn-module.fixture";

type HydrateSessionResult = {
  session: WorkspaceSession;
  sharedAnalysis: SharedAnalysis;
  canvasScene?: CanvasScene;
  learnModule?: LearnModule;
};

export async function hydrateSession(session: WorkspaceSession): Promise<HydrateSessionResult> {
  try {
    const analysis = await getSharedAnalysisById(session.latestAnalysisId);
    if (!analysis) throw new Error("Analysis missing from DB");
    
    const scene = session.latestSceneId ? await getCanvasSceneById(session.latestSceneId) : null;
    const learn = session.latestLearnModuleId ? await getLearnModuleById(session.latestLearnModuleId) : null;

    return {
      session,
      sharedAnalysis: analysis,
      canvasScene: scene || undefined,
      learnModule: learn || undefined,
    };
  } catch (e) {
    console.warn("Hydration failed (DB empty or missing), falling back to mock fixtures");
    return {
      session,
      sharedAnalysis: mockSharedAnalysis,
      canvasScene: session.latestSceneId ? mockCanvasScene : undefined,
      learnModule: session.latestLearnModuleId ? mockLearnModule : undefined,
    };
  }
}
