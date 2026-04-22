import { z } from "zod";
import { WorkspaceSessionSchema } from "../schemas/session.schema";

export type WorkspaceSession = z.infer<typeof WorkspaceSessionSchema>;
