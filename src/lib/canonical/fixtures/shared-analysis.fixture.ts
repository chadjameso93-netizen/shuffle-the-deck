import { SharedAnalysis } from "../types/analysis";
import { SafetyMode } from "../enums/safety";
import { CardRoleFamily, CardExpressionState } from "../enums/cards";
import { generateCanonicalId } from "../utils/ids";

export const mockSharedAnalysis: SharedAnalysis = {
  id: generateCanonicalId("ana"),
  summary: {
    whatIsHappening: "The user is feeling pressured by a deadline and adopting a defensive stance.",
    howItMayBeLanding: "It feels like an impossible standard to meet.",
    oneLineRead: "Pressure is forcing you into a corner.",
  },
  activeLoop: {
    label: "Defensive Avoidance",
    description: "avoidance -> guilt -> cramming",
    relationalShape: "Self vs Expectation",
  },
  userState: {
    roleLabel: "The Critic",
    cardFamily: CardRoleFamily.CORE,
    expressionState: CardExpressionState.DEFENDED,
    pressureLabel: "High Pressure",
  },
  timing: {
    amplificationLabel: "Late Stage Panic",
    intensity: 8,
    notes: "Action is needed soon, but rushing will hurt.",
  },
  leverage: "Shift focus from 'must finish' to 'what is the next smallest clean move'.",
  recommendation: {
    posture: "Neutral observation",
    cleanMove: "Define one clear boundary.",
    openingLine: "I can't do it all, but I can do this.",
    whatNotToDo: "Do not attempt to complete everything tonight.",
  },
  branchCues: ["Explore fear of failure", "Explore alternative timelines"],
  sceneHints: {
    sceneType: "initial",
  },
  learnHints: {
    title: "Understanding Defensive Avoidance",
    patternKey: "defensive_avoidance",
  },
  confidence: 85,
  provenance: "system_generated",
  safetyDecision: {
    mode: SafetyMode.FULL,
    allowedSurfaces: ["main", "canvas", "learn"],
    reasons: ["User query indicates standard operating pressure."],
  },
};
