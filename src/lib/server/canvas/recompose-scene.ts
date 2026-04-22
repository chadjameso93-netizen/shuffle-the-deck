import { CanvasScene } from "../../canonical/types/canvas";
import { SharedAnalysis } from "../../canonical/types/analysis";
import { CardExpressionState } from "../../canonical/enums/cards";
import { buildRecomposeSummary } from "./build-recompose-summary";

export type RecomposeSceneArgs = {
  analysis: SharedAnalysis;
  currentScene: CanvasScene;
  cardId: string;
  chosenExpressionState: CardExpressionState;
};

/**
 * Deterministically recomputes the entire CanvasScene field based on a single card's locked expression state.
 */
export function recomposeScene(args: RecomposeSceneArgs): CanvasScene {
  const { currentScene, cardId, chosenExpressionState, analysis } = args;
  
  // Clone current scene to mutate
  const nextScene: CanvasScene = JSON.parse(JSON.stringify(currentScene));
  
  const targetCard = nextScene.cards.find(c => c.id === cardId);
  if (!targetCard) return currentScene;
  
  // Update target card state
  targetCard.expressionState = chosenExpressionState;
  
  // Deterministic cascading effects
  switch (chosenExpressionState) {
    case CardExpressionState.DEFENDED:
      targetCard.pressureIntensity = Math.min(10, targetCard.pressureIntensity + 2);
      targetCard.timingCharge = Math.min(10, targetCard.timingCharge + 1);
      nextScene.nextActionCue = "Explore what this card is protecting.";
      break;
      
    case CardExpressionState.ADAPTIVE:
      targetCard.pressureIntensity = Math.max(0, targetCard.pressureIntensity - 3);
      targetCard.timingCharge = Math.max(0, targetCard.timingCharge - 2);
      nextScene.nextActionCue = "The system is stabilizing. Where does focus belong now?";
      break;
      
    case CardExpressionState.ALIGNED:
      targetCard.pressureIntensity = Math.max(0, targetCard.pressureIntensity - 6);
      targetCard.timingCharge = 0;
      nextScene.nextActionCue = "Clarity achieved. You can move forward.";
      break;
      
    case CardExpressionState.GIFT:
      targetCard.pressureIntensity = 0;
      targetCard.timingCharge = 0;
      targetCard.giftAccessPoint = "unlocked";
      nextScene.nextActionCue = "Integration complete. The gift is available.";
      break;
  }
  
  // Update connections (tension cascades down as the focus card relaxes)
  nextScene.connections.forEach(conn => {
    if (conn.sourceCardId === cardId || conn.targetCardId === cardId) {
      if (chosenExpressionState === CardExpressionState.ADAPTIVE) {
        conn.tension = Math.max(0, conn.tension - 3);
      } else if (chosenExpressionState === CardExpressionState.ALIGNED) {
        conn.tension = Math.max(0, conn.tension - 6);
      } else if (chosenExpressionState === CardExpressionState.GIFT) {
        conn.tension = 0;
      }
    }
  });
  
  // Update the scene's summary
  const summaryLines = buildRecomposeSummary({ previousScene: currentScene, nextScene, analysis });
  nextScene.whatChangedSummary = summaryLines.join(" ");
  
  return nextScene;
}
