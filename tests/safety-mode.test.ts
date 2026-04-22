import { describe, it, expect } from "vitest";
import { resolveSafetyMode } from "../src/lib/server/safety/resolve-safety-mode";
import { SafetyMode } from "../src/lib/canonical/enums/safety";
import { mockSharedAnalysis } from "../src/lib/canonical/fixtures/shared-analysis.fixture";

describe("Safety Mode Resolution", () => {
  it("resolves mode from analysis if present", () => {
    const mode = resolveSafetyMode({ analysis: mockSharedAnalysis });
    expect(mode).toBe(SafetyMode.FULL);
  });
});
