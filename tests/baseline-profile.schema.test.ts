import { describe, it, expect } from "vitest";
import { BaselineOrientationProfileSchema } from "../src/lib/canonical/schemas/baseline.schema";
import { mockBaselineProfile } from "../src/lib/canonical/fixtures/baseline-profile.fixture";

describe("Baseline Profile Schema", () => {
  it("validates the standard fixture", () => {
    const result = BaselineOrientationProfileSchema.safeParse(mockBaselineProfile);
    expect(result.success).toBe(true);
  });

  it("fails if confidence level is invalid", () => {
    const badProfile = {
      ...mockBaselineProfile,
      inputConfidence: {
        ...mockBaselineProfile.inputConfidence,
        birthDate: "magic", // invalid
      }
    };
    const result = BaselineOrientationProfileSchema.safeParse(badProfile);
    expect(result.success).toBe(false);
  });
});
