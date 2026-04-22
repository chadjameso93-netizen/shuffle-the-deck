"use server";

import { createBaselineProfile } from "@/lib/server/start/create-baseline-profile";
import { initLiveTiming } from "@/lib/server/start/init-live-timing";
import { saveSession } from "@/lib/server/workspace/save-session";
import { mockSharedAnalysis } from "@/lib/canonical/fixtures/shared-analysis.fixture";
import { redirect } from "next/navigation";

export async function submitStartFlow(data: {
  birthDate: string;
  birthTime?: string;
  city?: string;
  country?: string;
}) {
  // 1. Create Baseline
  const profile = await createBaselineProfile({
    birthDate: data.birthDate,
    birthTime: data.birthTime,
    birthplace: { city: data.city, country: data.country },
  });

  // 2. Initialize Timing
  await initLiveTiming({ baselineProfileId: profile.id });

  // 3. Setup initial session linkage
  // In a real flow, a real analysis would be generated here or right after
  await saveSession({
    latestAnalysisId: mockSharedAnalysis.id,
    activeSurface: "main",
    title: "Initial Baseline Session",
  });

  redirect("/app/now");
}
