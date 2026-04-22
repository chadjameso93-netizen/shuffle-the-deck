import { SafetyDecision } from "../../canonical/types/safety";
import { SharedAnalysis } from "../../canonical/types/analysis";
import { CanvasScene } from "../../canonical/types/canvas";
import { LearnModule } from "../../canonical/types/learn";
import { WorkspaceSession } from "../../canonical/types/session";

export type AnalyzeResponse = {
  requestId: string;
  safetyDecision: SafetyDecision;
  sharedAnalysis: SharedAnalysis;
  canvasScene?: CanvasScene;
  learnModule?: LearnModule;
  workspaceSession?: WorkspaceSession;
};
