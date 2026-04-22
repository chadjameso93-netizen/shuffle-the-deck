import { describe, it, expect } from "vitest";
import { buildSharedAnalysis } from "../src/lib/server/analyze/build-shared-analysis";

describe("Analyze Route Pipeline", () => {
  it("builds a full canonical analysis from normal input", async () => {
    const result = await buildSharedAnalysis({
      input: { text: "I'm having trouble asserting myself at work." }
    });

    expect(result.id).toBeDefined();
    expect(result.safetyDecision.mode).toBe("full");
    expect(result.branchCues.length).toBeGreaterThan(0);
    expect(result.recommendation.whatNotToDo).toBeDefined();
  });

  it("triggers safety grounding downgrade on overwhelm input", async () => {
    const result = await buildSharedAnalysis({
      input: { text: "I am in crisis and feel overwhelm." }
    });

    expect(result.safetyDecision.mode).toBe("grounding");
    expect(result.branchCues).toHaveLength(0);
    expect(result.recommendation.whatNotToDo).toBeUndefined();
    expect(result.otherState).toBeUndefined();
  });
});
