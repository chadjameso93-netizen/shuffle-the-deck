import { SafetyDecision } from "../../../canonical/types/safety";
import { PatternStageOutput } from "./run-pattern-stage";
import { RecommendationStageOutput } from "./run-recommendation-stage";
import { ConfidenceStageOutput } from "./run-confidence-stage";

export function runDowngradeStage(
  safety: SafetyDecision,
  confidence: ConfidenceStageOutput,
  pattern: PatternStageOutput,
  recommendation: RecommendationStageOutput,
  branchCues: string[]
) {
  const needsDowngrade = safety.mode === "grounding" || confidence.bucket === "low";

  return {
    pattern: {
      ...pattern,
      otherExpressionState: needsDowngrade ? undefined : pattern.otherExpressionState,
      otherCardFamily: needsDowngrade ? undefined : pattern.otherCardFamily,
    },
    recommendation: {
      ...recommendation,
      whatNotToDo: needsDowngrade ? undefined : recommendation.whatNotToDo,
      openingLine: needsDowngrade ? undefined : recommendation.openingLine,
    },
    branchCues: needsDowngrade ? [] : branchCues,
  };
}
