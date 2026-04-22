import { SafetyDecision } from "../types/safety";
import { SafetyMode } from "../enums/safety";

export const safetyFullFixture: SafetyDecision = {
  mode: SafetyMode.FULL,
  allowedSurfaces: ["main", "branch", "canvas", "learn", "simulate"],
  reasons: ["Safe to proceed with full analytical depth."],
};
