import { BaselineOrientationProfile, ProvenanceLevel } from "../../canonical/types/baseline";
import { generateCanonicalId } from "../../canonical/utils/ids";
import { BaselineOrientationProfileSchema } from "../../canonical/schemas/baseline.schema";

export type CreateBaselineProfileArgs = {
  birthDate: string;
  birthTime?: string;
  birthplace: {
    city?: string;
    region?: string;
    country?: string;
    timezone?: string;
  };
};

export async function createBaselineProfile(
  args: CreateBaselineProfileArgs
): Promise<BaselineOrientationProfile> {
  const now = new Date().toISOString();

  // Explicit incomplete birth-time handling
  let birthTimeProvenance: ProvenanceLevel = "exact";
  if (!args.birthTime) {
    birthTimeProvenance = "fallback";
  } else if (args.birthTime.includes("approx") || args.birthTime.endsWith("00")) {
    // Scaffold heuristic for estimated times
    birthTimeProvenance = "estimated";
  }

  const profile: BaselineOrientationProfile = {
    id: generateCanonicalId("baseline"),
    createdAt: now,
    updatedAt: now,
    birthDate: args.birthDate,
    birthTime: args.birthTime,
    birthplace: args.birthplace,
    inputConfidence: {
      birthDate: "exact",
      birthTime: birthTimeProvenance,
      birthplace: args.birthplace.city ? "exact" : "fallback",
    },
    baselineSummary: {
      pacingStyle: birthTimeProvenance === "fallback" ? "Estimated default pacing" : "Measured and deliberate",
      pressureStyle: "Adapts to direct pressure, resists subtle pressure",
      roleEmergenceTendency: "Takes focus when boundaries are clear",
      communicationTendency: "Direct and unembellished",
    },
    notes: birthTimeProvenance === "fallback" ? ["Birth time omitted. Some baseline mechanics use defensive defaults."] : [],
  };

  return BaselineOrientationProfileSchema.parse(profile);
}
