import { z } from "zod";

export const AnalyzeInputEnvelopeSchema = z.object({
  input: z.object({
    text: z.string().min(1),
    source: z.enum(["self", "relationship", "family", "team"]).optional(),
  }),
  baselineProfileId: z.string().optional(),
  workspaceSessionId: z.string().optional(),
  currentSceneId: z.string().optional(),
  requestedSurface: z.enum(["main"]).optional(),
});

export type AnalyzeInputEnvelope = z.infer<typeof AnalyzeInputEnvelopeSchema>;
