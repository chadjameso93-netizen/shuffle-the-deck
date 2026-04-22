import { describe, it, expect } from "vitest";
import { getAllowedSurfaces } from "../src/lib/server/safety/get-allowed-surfaces";
import { getUiIntensity } from "../src/lib/server/safety/get-ui-intensity";
import { SafetyMode } from "../src/lib/canonical/enums/safety";

describe("Surface Availability by Safety Mode", () => {
  it("restricts grounding mode", () => {
    const allowed = getAllowedSurfaces(SafetyMode.GROUNDING);
    expect(allowed).toContain("main");
    expect(allowed).toContain("learn");
    expect(allowed).not.toContain("canvas");
    
    const intensity = getUiIntensity(SafetyMode.GROUNDING);
    expect(intensity.canvas).toBe("hidden");
    expect(intensity.depth).toBe("bounded");
  });

  it("throttles canvas in throttled mode", () => {
    const allowed = getAllowedSurfaces(SafetyMode.THROTTLED);
    expect(allowed).toContain("main");
    expect(allowed).toContain("canvas");
    expect(allowed).toContain("learn");
    
    const intensity = getUiIntensity(SafetyMode.THROTTLED);
    expect(intensity.canvas).toBe("simplified");
    expect(intensity.depth).toBe("reduced");
  });

  it("allows all in full mode", () => {
    const allowed = getAllowedSurfaces(SafetyMode.FULL);
    expect(allowed).toContain("main");
    expect(allowed).toContain("canvas");
    expect(allowed).toContain("branch");
    
    const intensity = getUiIntensity(SafetyMode.FULL);
    expect(intensity.canvas).toBe("full");
  });
});
