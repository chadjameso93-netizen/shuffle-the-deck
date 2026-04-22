import { SafetyMode } from "../../canonical/enums/safety";
import { SharedAnalysis } from "../../canonical/types/analysis";
import { WorkspaceSession } from "../../canonical/types/session";

type ResolveSafetyModeArgs = {
  analysis?: SharedAnalysis;
  session?: WorkspaceSession;
};

export function resolveSafetyMode(args: ResolveSafetyModeArgs): SafetyMode {
  // If analysis is present, it is the ultimate source of truth for safety.
  if (args.analysis) {
    return args.analysis.safetyDecision.mode;
  }
  
  // Default to throttled if we don't have analysis but do have a session (safe fallback)
  if (args.session) {
    return SafetyMode.THROTTLED;
  }
  
  // Default to full if no context (development fallback)
  return SafetyMode.FULL;
}
