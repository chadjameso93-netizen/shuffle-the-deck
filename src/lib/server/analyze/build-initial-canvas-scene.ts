import { CanvasScene } from "../../canonical/types/canvas";
import { SharedAnalysis } from "../../canonical/types/analysis";
import { SceneType, TransitionReason } from "../../canonical/enums/scene";
import { CardRoleFamily, CardExpressionState } from "../../canonical/enums/cards";
import { generateCanonicalId } from "../../canonical/utils/ids";

export function buildInitialCanvasScene(analysis: SharedAnalysis): CanvasScene {
  const isDefensive = analysis.userState.expressionState === CardExpressionState.DEFENDED;
  
  const focusCardId = generateCanonicalId("card");
  const secondaryCardId = generateCanonicalId("card");

  return {
    id: generateCanonicalId("scene"),
    sceneType: SceneType.INITIAL,
    focusCardId: focusCardId,
    cards: [
      {
        id: focusCardId,
        roleLabel: analysis.userState.roleLabel,
        cardFamily: analysis.userState.cardFamily,
        expressionState: analysis.userState.expressionState,
        pressureIntensity: isDefensive ? 8 : 4,
        timingCharge: isDefensive ? 7 : 3,
        placementHint: "center",
      },
      {
        id: secondaryCardId,
        roleLabel: "The Vision",
        cardFamily: CardRoleFamily.EXTERNAL,
        expressionState: CardExpressionState.SHADOW,
        pressureIntensity: 5,
        timingCharge: 2,
        placementHint: "periphery",
      }
    ],
    connections: [
      {
        id: generateCanonicalId("conn"),
        sourceCardId: focusCardId,
        targetCardId: secondaryCardId,
        connectionType: isDefensive ? "suppressing" : "observing",
        tension: isDefensive ? 8 : 3,
      }
    ],
    transitionReason: TransitionReason.NEW_ANALYSIS,
    whatChangedSummary: `Field initialized based on ${analysis.userState.expressionState} state.`,
    nextActionCue: `Select ${analysis.userState.roleLabel} to see its state.`,
    pressureHotspots: [focusCardId],
    safetyDecision: analysis.safetyDecision,
  };
}
