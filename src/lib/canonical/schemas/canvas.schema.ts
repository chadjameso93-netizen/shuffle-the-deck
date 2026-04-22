import { z } from "zod";
import { SafetyDecisionSchema } from "./safety.schema";
import { CardRoleFamily, CardExpressionState } from "../enums/cards";
import { SceneType, TransitionReason } from "../enums/scene";

export const CanvasSceneCardSchema = z.object({
  id: z.string(),
  roleLabel: z.string(),
  cardFamily: z.nativeEnum(CardRoleFamily),
  expressionState: z.nativeEnum(CardExpressionState),
  visualState: z.record(z.any()).optional(), // Extensible visual config placeholder
  pressureIntensity: z.number().min(0).max(10),
  timingCharge: z.number().min(0).max(10),
  placementHint: z.string().optional(),
  protectionLabel: z.string().optional(),
  giftAccessPoint: z.string().optional(),
});

export const CanvasSceneConnectionSchema = z.object({
  id: z.string(),
  sourceCardId: z.string(),
  targetCardId: z.string(),
  connectionType: z.string(),
  tension: z.number().min(0).max(10),
});

export const CanvasSceneSchema = z.object({
  id: z.string(),
  sceneType: z.nativeEnum(SceneType),
  focusCardId: z.string().optional(),
  cards: z.array(CanvasSceneCardSchema),
  connections: z.array(CanvasSceneConnectionSchema),
  transitionReason: z.nativeEnum(TransitionReason),
  whatChangedSummary: z.string().optional(),
  nextActionCue: z.string().optional(),
  pressureHotspots: z.array(z.string()),
  safetyDecision: SafetyDecisionSchema,
});
