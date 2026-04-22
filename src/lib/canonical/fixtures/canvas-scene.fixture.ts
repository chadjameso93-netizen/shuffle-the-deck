import { CanvasScene } from "../types/canvas";
import { SceneType, TransitionReason } from "../enums/scene";
import { CardRoleFamily, CardExpressionState } from "../enums/cards";
import { SafetyMode } from "../enums/safety";
import { generateCanonicalId } from "../utils/ids";

const card1Id = generateCanonicalId("card");
const card2Id = generateCanonicalId("card");

export const mockCanvasScene: CanvasScene = {
  id: generateCanonicalId("scene"),
  sceneType: SceneType.INITIAL,
  focusCardId: card1Id,
  cards: [
    {
      id: card1Id,
      roleLabel: "The Critic",
      cardFamily: CardRoleFamily.CORE,
      expressionState: CardExpressionState.DEFENDED,
      pressureIntensity: 8,
      timingCharge: 5,
    },
    {
      id: card2Id,
      roleLabel: "The Vision",
      cardFamily: CardRoleFamily.EXTERNAL,
      expressionState: CardExpressionState.SHADOW,
      pressureIntensity: 3,
      timingCharge: 2,
    },
  ],
  connections: [
    {
      id: generateCanonicalId("conn"),
      sourceCardId: card1Id,
      targetCardId: card2Id,
      connectionType: "suppressing",
      tension: 7,
    },
  ],
  transitionReason: TransitionReason.NEW_ANALYSIS,
  whatChangedSummary: "The Critic appeared and is suppressing The Vision.",
  nextActionCue: "Select The Critic to examine its defensive posture.",
  pressureHotspots: [card1Id],
  safetyDecision: {
    mode: SafetyMode.FULL,
    allowedSurfaces: ["main", "canvas", "learn"],
    reasons: ["Safe to display full visual tension."],
  },
};
