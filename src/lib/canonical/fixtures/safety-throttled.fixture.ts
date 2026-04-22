import { SafetyDecision } from "../types/safety";
import { SafetyMode } from "../enums/safety";

export const safetyThrottledFixture: SafetyDecision = {
  mode: SafetyMode.THROTTLED,
  allowedSurfaces: ["main", "canvas", "learn"],
  reasons: ["User input indicates moderate stress. Throttling symbolic depth."],
};
