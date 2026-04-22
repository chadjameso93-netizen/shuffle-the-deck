import { AnalyzeInputEnvelope } from "../input-envelope";
import { mockLlmInference } from "../providers/mock-llm";

export type PatternStageOutput = {
  activeLoopLabel: string;
  userCardFamily: string;
  userExpressionState: string;
  otherCardFamily?: string;
  otherExpressionState?: string;
  leveragePoint?: string;
};

export async function runPatternStage(input: AnalyzeInputEnvelope): Promise<PatternStageOutput> {
  const res = await mockLlmInference(input.input.text, "pattern");
  return res as PatternStageOutput;
}
