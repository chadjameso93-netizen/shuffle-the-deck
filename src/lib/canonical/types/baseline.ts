import { z } from "zod";
import { BaselineOrientationProfileSchema, ProvenanceLevelSchema } from "../schemas/baseline.schema";

export type ProvenanceLevel = z.infer<typeof ProvenanceLevelSchema>;
export type BaselineOrientationProfile = z.infer<typeof BaselineOrientationProfileSchema>;
