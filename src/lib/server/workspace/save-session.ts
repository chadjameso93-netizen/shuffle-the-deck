import { WorkspaceSession } from "../../canonical/types/session";
import { generateCanonicalId } from "../../canonical/utils/ids";
import { saveWorkspaceSession } from "../persistence/sessions";

type SaveSessionArgs = {
  sessionId?: string;
  latestAnalysisId: string;
  latestSceneId?: string;
  latestLearnModuleId?: string;
  activeSurface: "main" | "canvas" | "learn";
  title?: string;
};

export async function saveSession(args: SaveSessionArgs): Promise<WorkspaceSession> {
  const now = new Date().toISOString();
  
  const sessionData: WorkspaceSession = {
    id: args.sessionId || generateCanonicalId("session"),
    latestAnalysisId: args.latestAnalysisId,
    latestSceneId: args.latestSceneId,
    latestLearnModuleId: args.latestLearnModuleId,
    activeSurface: args.activeSurface,
    createdAt: now,
    updatedAt: now,
    title: args.title || "New Session",
  };

  try {
    return await saveWorkspaceSession(sessionData);
  } catch (e) {
    console.warn("Prisma failed or is uninitialized during saveSession. Returning object purely in-memory.");
    return sessionData;
  }
}
