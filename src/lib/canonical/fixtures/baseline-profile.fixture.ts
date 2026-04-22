import { BaselineOrientationProfile } from "../types/baseline";
import { generateCanonicalId } from "../utils/ids";

export const mockBaselineProfile: BaselineOrientationProfile = {
  id: generateCanonicalId("baseline"),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  birthDate: "1990-01-01",
  birthTime: "12:00",
  birthplace: {
    city: "San Francisco",
    region: "CA",
    country: "US",
  },
  inputConfidence: {
    birthDate: "exact",
    birthTime: "exact",
    birthplace: "exact",
  },
  baselineSummary: {
    pacingStyle: "Measured and deliberate",
    pressureStyle: "Adapts to direct pressure, resists subtle pressure",
    roleEmergenceTendency: "Takes focus when boundaries are clear",
    communicationTendency: "Direct and unembellished",
  },
};
