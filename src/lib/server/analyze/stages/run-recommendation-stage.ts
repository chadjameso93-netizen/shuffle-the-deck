import { AnalyzeInputEnvelope } from "../input-envelope";
import { mockLlmInference } from "../providers/mock-llm";

export type RecommendationStageOutput = {
  posture: string;
  cleanMove: string;
  openingLine?: string;
  whatNotToDo?: string;
};

export async function runRecommendationStage(input: AnalyzeInputEnvelope): Promise<RecommendationStageOutput> {
  const res = await mockLlmInference(input.input.text, "recommendation");
  return res as RecommendationStageOutput;
}
