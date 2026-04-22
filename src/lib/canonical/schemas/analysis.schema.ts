import { z } from "zod";
import { SafetyDecisionSchema } from "./safety.schema";
import { CardRoleFamily, CardExpressionState } from "../enums/cards";

export const SharedAnalysisSummarySchema = z.object({
  whatIsHappening: z.string(),
  howItMayBeLanding: z.string(),
  oneLineRead: z.string(),
});

export const SharedAnalysisActiveLoopSchema = z.object({
  label: z.string(),
  description: z.string(),
  relationalShape: z.string(),
});

export const SharedAnalysisUserStateSchema = z.object({
  roleLabel: z.string(),
  cardFamily: z.nativeEnum(CardRoleFamily),
  expressionState: z.nativeEnum(CardExpressionState),
  pressureLabel: z.string(),
});

export const SharedAnalysisTimingSchema = z.object({
  amplificationLabel: z.string(),
  intensity: z.number().min(0).max(10),
  notes: z.string(),
});

export const SharedAnalysisRecommendationSchema = z.object({
  posture: z.string(),
  cleanMove: z.string(),
  openingLine: z.string(),
  whatNotToDo: z.string(),
});

export const SharedAnalysisSceneHintsSchema = z.object({
  sceneType: z.string(),
  analysisId: z.string().optional(),
  sceneId: z.string().optional(),
});

export const SharedAnalysisLearnHintsSchema = z.object({
  title: z.string(),
  patternKey: z.string(),
});

export const SharedAnalysisSchema = z.object({
  id: z.string(),
  summary: SharedAnalysisSummarySchema,
  activeLoop: SharedAnalysisActiveLoopSchema,
  userState: SharedAnalysisUserStateSchema,
  otherState: z.string().optional(),
  timing: SharedAnalysisTimingSchema,
  leverage: z.string(),
  recommendation: SharedAnalysisRecommendationSchema,
  branchCues: z.array(z.string()),
  sceneHints: SharedAnalysisSceneHintsSchema,
  learnHints: SharedAnalysisLearnHintsSchema,
  confidence: z.number().min(0).max(100),
  provenance: z.string(),
  safetyDecision: SafetyDecisionSchema,
});
