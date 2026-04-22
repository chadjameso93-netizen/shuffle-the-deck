import { WorkspaceSession } from "../types/session";
import { generateCanonicalId } from "../utils/ids";
import { mockSharedAnalysis } from "./shared-analysis.fixture";
import { mockCanvasScene } from "./canvas-scene.fixture";
import { mockLearnModule } from "./learn-module.fixture";

export const mockWorkspaceSession: WorkspaceSession = {
  id: generateCanonicalId("session"),
  latestAnalysisId: mockSharedAnalysis.id,
  latestSceneId: mockCanvasScene.id,
  latestLearnModuleId: mockLearnModule.id,
  activeSurface: "main",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  title: "Late night pressure session",
};
