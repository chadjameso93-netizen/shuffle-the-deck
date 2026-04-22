import { describe, it, expect } from "vitest";
import { hydrateSession } from "../src/lib/server/workspace/hydrate-session";
import { mockWorkspaceSession } from "../src/lib/canonical/fixtures/workspace-session.fixture";

describe("Session Hydration", () => {
  it("hydrates a session into full canonical objects", async () => {
    const result = await hydrateSession(mockWorkspaceSession);
    expect(result.session.id).toBe(mockWorkspaceSession.id);
    expect(result.sharedAnalysis).toBeDefined();
    // It should load the canvas scene and learn module if their IDs are present
    expect(result.canvasScene).toBeDefined();
    expect(result.learnModule).toBeDefined();
  });
});
