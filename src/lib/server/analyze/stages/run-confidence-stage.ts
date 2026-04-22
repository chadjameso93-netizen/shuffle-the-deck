export type ConfidenceStageOutput = {
  score: number;
  bucket: "high" | "medium" | "low";
};

// Evaluates intermediate outputs to determine confidence
export function runConfidenceStage(
  structure: any,
  pattern: any,
  recommendation: any
): ConfidenceStageOutput {
  if (!pattern.userCardFamily || !recommendation.cleanMove) {
    return { score: 0.3, bucket: "low" };
  }
  if (!pattern.otherCardFamily) {
    return { score: 0.6, bucket: "medium" };
  }
  return { score: 0.9, bucket: "high" };
}
