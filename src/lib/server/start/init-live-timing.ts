import { generateCanonicalId } from "../../canonical/utils/ids";

type InitLiveTimingArgs = {
  baselineProfileId: string;
};

export type LiveTimingOverlay = {
  id: string;
  baselineProfileId: string;
  initializedAt: string;
  status: "initialized";
  notes?: string[];
};

export async function initLiveTiming(
  args: InitLiveTimingArgs
): Promise<LiveTimingOverlay> {
  return {
    id: generateCanonicalId("timing"),
    baselineProfileId: args.baselineProfileId,
    initializedAt: new Date().toISOString(),
    status: "initialized",
    notes: ["Timing overlay active. Placeholder implementation."],
  };
}
