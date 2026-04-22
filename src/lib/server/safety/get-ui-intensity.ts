import { SafetyMode } from "../../canonical/enums/safety";

export type UiIntensity = {
  motion: "minimal" | "reduced" | "full";
  depth: "bounded" | "reduced" | "full";
  canvas: "hidden" | "simplified" | "full";
  learn: "bounded" | "concise" | "full";
};

export function getUiIntensity(mode: SafetyMode): UiIntensity {
  switch (mode) {
    case SafetyMode.GROUNDING:
      return {
        motion: "minimal",
        depth: "bounded",
        canvas: "hidden",
        learn: "bounded",
      };
    case SafetyMode.THROTTLED:
      return {
        motion: "reduced",
        depth: "reduced",
        canvas: "simplified",
        learn: "concise",
      };
    case SafetyMode.FULL:
    default:
      return {
        motion: "full",
        depth: "full",
        canvas: "full",
        learn: "full",
      };
  }
}
