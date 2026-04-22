import { SafetyMode } from "../../canonical/enums/safety";
import { SurfaceName } from "../../canonical/types/safety";

export function getAllowedSurfaces(mode: SafetyMode): SurfaceName[] {
  switch (mode) {
    case SafetyMode.GROUNDING:
      return ["main", "learn"];
    case SafetyMode.THROTTLED:
      return ["main", "canvas", "learn"];
    case SafetyMode.FULL:
      return ["main", "branch", "canvas", "learn", "simulate"];
    default:
      return ["main"];
  }
}
