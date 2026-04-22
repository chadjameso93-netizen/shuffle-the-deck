import { AnalyzeInputEnvelope } from "../input-envelope";
import { SafetyDecision } from "../../../canonical/types/safety";
import { SafetyMode } from "../../../canonical/enums/safety";
import { mockLlmInference } from "../providers/mock-llm";

export async function runSafetyStage(input: AnalyzeInputEnvelope): Promise<SafetyDecision> {
  const llmRes = await mockLlmInference(input.input.text, "safety");
  
  return {
    mode: llmRes.mode as SafetyMode,
    allowedSurfaces: llmRes.mode === "grounding" ? ["main", "learn"] : ["main", "canvas", "learn"],
    reasons: llmRes.reasons,
  };
}
