import { SafetyDecision } from "../types/safety";
import { SafetyMode } from "../enums/safety";

export const safetyGroundingFixture: SafetyDecision = {
  mode: SafetyMode.GROUNDING,
  allowedSurfaces: ["main", "learn"],
  reasons: ["User input indicates severe overwhelm. Grounding mode engaged."],
};
