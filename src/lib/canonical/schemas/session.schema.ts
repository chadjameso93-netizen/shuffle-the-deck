import { z } from "zod";

export const WorkspaceSurfaceSchema = z.enum(["main", "canvas", "learn"]);

export const WorkspaceSessionSchema = z.object({
  id: z.string(),
  createdAt: z.string(), // Using string for ISO dates in JSON scaffolding
  updatedAt: z.string(),
  latestAnalysisId: z.string(),
  latestSceneId: z.string().optional(),
  latestLearnModuleId: z.string().optional(),
  activeSurface: WorkspaceSurfaceSchema,
  title: z.string().optional(),
});
