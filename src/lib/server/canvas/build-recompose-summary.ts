import { CanvasScene } from "../../canonical/types/canvas";
import { SharedAnalysis } from "../../canonical/types/analysis";
import { CardExpressionState } from "../../canonical/enums/cards";

type BuildRecomposeSummaryArgs = {
  previousScene: CanvasScene;
  nextScene: CanvasScene;
  analysis: SharedAnalysis;
};

/**
 * Deterministically generates summary text based on what changed in the scene.
 */
export function buildRecomposeSummary(args: BuildRecomposeSummaryArgs): string[] {
  const { previousScene, nextScene } = args;
  
  if (!previousScene.focusCardId) return ["Scene initialized."];
  
  const prevFocus = previousScene.cards.find(c => c.id === previousScene.focusCardId);
  const nextFocus = nextScene.cards.find(c => c.id === nextScene.focusCardId);
  
  if (!prevFocus || !nextFocus) return ["Field updated."];
  
  const summaries: string[] = [];
  
  if (prevFocus.expressionState !== nextFocus.expressionState) {
    if (nextFocus.expressionState === CardExpressionState.ADAPTIVE) {
      summaries.push(`The ${nextFocus.roleLabel} relaxed its defensive posture.`);
      summaries.push("Pressure in the field has decreased.");
    } else if (nextFocus.expressionState === CardExpressionState.ALIGNED) {
      summaries.push(`The ${nextFocus.roleLabel} became fully aligned.`);
      summaries.push("The field is highly coherent.");
    } else if (nextFocus.expressionState === CardExpressionState.GIFT) {
      summaries.push(`The gift of ${nextFocus.roleLabel} is now accessible.`);
      summaries.push("Tension has dissolved.");
    } else {
      summaries.push(`The ${nextFocus.roleLabel} shifted to ${nextFocus.expressionState}.`);
    }
  } else {
    summaries.push("No major expression change.");
  }
  
  return summaries;
}
