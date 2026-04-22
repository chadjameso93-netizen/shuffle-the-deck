import { z } from "zod";
import { SafetyDecisionSchema } from "./safety.schema";

export const LearnModuleSchema = z.object({
  id: z.string(),
  title: z.string(),
  patternKey: z.string(),
  whatThisPatternIs: z.string(),
  whatUsuallyGoesWrong: z.string(),
  whatPressureIsDoing: z.string(),
  whatHelps: z.string(),
  oneLineToTry: z.string(),
  safetyDecision: SafetyDecisionSchema,
  analysisId: z.string(),
});
