import { z } from "zod";
import { SafetyDecisionSchema, SurfaceNameSchema } from "../schemas/safety.schema";

export type SurfaceName = z.infer<typeof SurfaceNameSchema>;
export type SafetyDecision = z.infer<typeof SafetyDecisionSchema>;
