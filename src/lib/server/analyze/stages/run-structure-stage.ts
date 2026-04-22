import { AnalyzeInputEnvelope } from "../input-envelope";
import { mockLlmInference } from "../providers/mock-llm";

export type StructureStageOutput = {
  relationalShape: string;
  pressurePoints: string[];
  actorHints: string[];
};

export async function runStructureStage(input: AnalyzeInputEnvelope): Promise<StructureStageOutput> {
  const res = await mockLlmInference(input.input.text, "structure");
  return res as StructureStageOutput;
}
