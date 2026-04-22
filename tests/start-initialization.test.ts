import { describe, it, expect } from "vitest";
import { createBaselineProfile } from "../src/lib/server/start/create-baseline-profile";

describe("Start Initialization", () => {
  it("returns fallback confidence when time is missing", async () => {
    const profile = await createBaselineProfile({
      birthDate: "1990-01-01",
      birthplace: { city: "London" },
    });
    
    expect(profile.inputConfidence.birthTime).toBe("fallback");
    expect(profile.notes).toContain("Birth time omitted. Some baseline mechanics use defensive defaults.");
  });

  it("returns exact confidence when time is provided strictly", async () => {
    const profile = await createBaselineProfile({
      birthDate: "1990-01-01",
      birthTime: "14:32",
      birthplace: { city: "London" },
    });
    
    expect(profile.inputConfidence.birthTime).toBe("exact");
    expect(profile.notes).toBeUndefined(); // or empty
  });
});
