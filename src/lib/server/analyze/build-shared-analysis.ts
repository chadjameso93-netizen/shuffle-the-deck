import { AnalyzeInputEnvelope } from "./input-envelope";
import { SharedAnalysis } from "../../canonical/types/analysis";
import { generateCanonicalId } from "../../canonical/utils/ids";
import { runSafetyStage } from "./stages/run-safety-stage";
import { runStructureStage } from "./stages/run-structure-stage";
import { runPatternStage } from "./stages/run-pattern-stage";
import { runRecommendationStage } from "./stages/run-recommendation-stage";
import { runConfidenceStage } from "./stages/run-confidence-stage";
import { runProvenanceStage } from "./stages/run-provenance-stage";
import { runDowngradeStage } from "./stages/run-downgrade-stage";
import { SharedAnalysisSchema } from "../../canonical/schemas/analysis.schema";

export async function buildSharedAnalysis(input: AnalyzeInputEnvelope): Promise<SharedAnalysis> {
  // Stage 1: Safety
  const safetyDecision = await runSafetyStage(input);

  // Stage 2 & 3: Structure & Pattern
  const structure = await runStructureStage(input);
  const patternRaw = await runPatternStage(input);

  // Stage 4: Recommendation
  const recommendationRaw = await runRecommendationStage(input);

  // Stage 5 & 6: Confidence & Provenance
  const confidence = runConfidenceStage(structure, patternRaw, recommendationRaw);
  const provenance = runProvenanceStage(confidence.bucket);

  // Base Branch Cues
  const baseBranchCues = ["Explore boundaries", "Look at leverage"];

  // Stage 7: Downgrade Enforcement
  const downgraded = runDowngradeStage(
    safetyDecision,
    confidence,
    patternRaw,
    recommendationRaw,
    baseBranchCues
  );

  const now = new Date().toISOString();

  // Canonical Build
  const analysis: SharedAnalysis = {
    id: generateCanonicalId("analysis"),
    createdAt: now,
    updatedAt: now,
    safetyDecision,
    summary: {
      oneLineRead: "Tension detected in field.",
      whatIsHappening: input.input.text, // Normally synthesized
      howItMayBeLanding: downgraded.pattern.otherExpressionState ? "They are likely feeling adaptive." : undefined,
    },
    activeLoop: {
      label: downgraded.pattern.activeLoopLabel,
      description: "A loop of action and reaction.",
      relationalShape: structure.relationalShape,
    },
    userState: {
      roleLabel: "User",
      cardFamily: downgraded.pattern.userCardFamily,
      expressionState: downgraded.pattern.userExpressionState,
      pressureLabel: "High Pressure",
    },
    otherState: downgraded.pattern.otherCardFamily ? {
      roleLabel: "Other",
      cardFamily: downgraded.pattern.otherCardFamily,
      expressionState: downgraded.pattern.otherExpressionState || "defended",
      pressureLabel: "Moderate Pressure",
    } : undefined,
    recommendation: {
      posture: downgraded.recommendation.posture,
      cleanMove: downgraded.recommendation.cleanMove,
      openingLine: downgraded.recommendation.openingLine,
      whatNotToDo: downgraded.recommendation.whatNotToDo,
    },
    branchCues: downgraded.branchCues,
    sceneHints: {
      sceneType: "dyadic",
      focusCardId: "card_user",
    },
    learnHints: {
      learnModuleId: generateCanonicalId("learn"),
      title: "Understanding Tension",
    },
  };

  return SharedAnalysisSchema.parse(analysis);
}
