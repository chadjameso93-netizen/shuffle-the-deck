import { LearnModule } from "../types/learn";
import { SafetyMode } from "../enums/safety";
import { generateCanonicalId } from "../utils/ids";
import { mockSharedAnalysis } from "./shared-analysis.fixture";

export const mockLearnModule: LearnModule = {
  id: generateCanonicalId("learn"),
  title: "Understanding Defensive Avoidance",
  patternKey: "defensive_avoidance",
  whatThisPatternIs: "A pattern where pressure triggers avoidance, leading to guilt.",
  whatUsuallyGoesWrong: "The cycle repeats because the guilt creates more pressure.",
  whatPressureIsDoing: "Pressure is trying to protect you from the pain of failing at the task.",
  whatHelps: "Breaking the task into a piece so small that failure is impossible.",
  oneLineToTry: "I am allowed to do a bad job on just the first paragraph.",
  safetyDecision: {
    mode: SafetyMode.FULL,
    allowedSurfaces: ["main", "canvas", "learn"],
    reasons: ["Standard psychoeducational module."],
  },
  analysisId: mockSharedAnalysis.id,
};
