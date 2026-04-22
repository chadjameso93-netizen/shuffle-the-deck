import { WorkspaceSession } from "../../canonical/types/session";
import { getLatestWorkspaceSession } from "../persistence/sessions";
import { mockWorkspaceSession } from "../../canonical/fixtures/workspace-session.fixture";

export async function getLatestSession(): Promise<WorkspaceSession | null> {
  try {
    const session = await getLatestWorkspaceSession();
    if (session) return session;
  } catch (e) {
    console.warn("Prisma failed or is uninitialized, falling back to mock");
  }
  
  // Graceful fallback for local development if DB is empty/unmigrated
  return mockWorkspaceSession;
}
