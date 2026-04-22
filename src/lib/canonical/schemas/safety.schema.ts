import { z } from "zod";
import { SafetyMode } from "../enums/safety";

export const SurfaceNameSchema = z.enum(["main", "branch", "canvas", "learn", "simulate"]);

export const SafetyDecisionSchema = z.object({
  mode: z.nativeEnum(SafetyMode),
  allowedSurfaces: z.array(SurfaceNameSchema),
  reasons: z.array(z.string()),
});
