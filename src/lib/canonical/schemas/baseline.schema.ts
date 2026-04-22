import { z } from "zod";

export const ProvenanceLevelSchema = z.enum(["exact", "estimated", "fallback"]);

export const BaselineOrientationProfileSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),

  birthDate: z.string(),
  birthTime: z.string().optional(),
  birthplace: z.object({
    city: z.string().optional(),
    region: z.string().optional(),
    country: z.string().optional(),
    timezone: z.string().optional(),
  }),

  inputConfidence: z.object({
    birthDate: ProvenanceLevelSchema,
    birthTime: ProvenanceLevelSchema,
    birthplace: ProvenanceLevelSchema,
  }),

  baselineSummary: z.object({
    pacingStyle: z.string().optional(),
    pressureStyle: z.string().optional(),
    roleEmergenceTendency: z.string().optional(),
    communicationTendency: z.string().optional(),
  }),

  notes: z.array(z.string()).optional(),
});
