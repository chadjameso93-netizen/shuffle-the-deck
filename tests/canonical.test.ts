import { describe, it, expect } from "vitest";
import { SharedAnalysisSchema } from "../src/lib/canonical/schemas/analysis.schema";
import { CanvasSceneSchema } from "../src/lib/canonical/schemas/canvas.schema";
import { LearnModuleSchema } from "../src/lib/canonical/schemas/learn.schema";
import { WorkspaceSessionSchema } from "../src/lib/canonical/schemas/session.schema";

import { mockSharedAnalysis } from "../src/lib/canonical/fixtures/shared-analysis.fixture";
import { mockCanvasScene } from "../src/lib/canonical/fixtures/canvas-scene.fixture";
import { mockLearnModule } from "../src/lib/canonical/fixtures/learn-module.fixture";
import { mockWorkspaceSession } from "../src/lib/canonical/fixtures/workspace-session.fixture";

describe("Canonical Schemas", () => {
  it("should parse valid SharedAnalysis fixture", () => {
    const result = SharedAnalysisSchema.safeParse(mockSharedAnalysis);
    expect(result.success).toBe(true);
  });

  it("should fail on invalid SharedAnalysis", () => {
    const result = SharedAnalysisSchema.safeParse({ ...mockSharedAnalysis, confidence: 150 });
    expect(result.success).toBe(false);
  });

  it("should parse valid CanvasScene fixture", () => {
    const result = CanvasSceneSchema.safeParse(mockCanvasScene);
    expect(result.success).toBe(true);
  });

  it("should parse valid LearnModule fixture", () => {
    const result = LearnModuleSchema.safeParse(mockLearnModule);
    expect(result.success).toBe(true);
  });

  it("should parse valid WorkspaceSession fixture", () => {
    const result = WorkspaceSessionSchema.safeParse(mockWorkspaceSession);
    expect(result.success).toBe(true);
  });
});
