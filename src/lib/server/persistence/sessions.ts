import { prisma } from "./prisma";
import { WorkspaceSession } from "../../canonical/types/session";
import { WorkspaceSessionSchema } from "../../canonical/schemas/session.schema";

export async function saveWorkspaceSession(session: WorkspaceSession): Promise<WorkspaceSession> {
  // Validate before write
  const validated = WorkspaceSessionSchema.parse(session);
  
  await prisma.workspaceSession.upsert({
    where: { id: validated.id },
    create: {
      id: validated.id,
      latestAnalysisId: validated.latestAnalysisId,
      latestSceneId: validated.latestSceneId,
      latestLearnModuleId: validated.latestLearnModuleId,
      activeSurface: validated.activeSurface,
      title: validated.title,
    },
    update: {
      latestAnalysisId: validated.latestAnalysisId,
      latestSceneId: validated.latestSceneId,
      latestLearnModuleId: validated.latestLearnModuleId,
      activeSurface: validated.activeSurface,
      title: validated.title,
      updatedAt: new Date(),
    },
  });
  
  return validated;
}

export async function getWorkspaceSessionById(id: string): Promise<WorkspaceSession | null> {
  const record = await prisma.workspaceSession.findUnique({
    where: { id },
  });
  
  if (!record) return null;
  
  try {
    return WorkspaceSessionSchema.parse({
      ...record,
      createdAt: record.createdAt.toISOString(),
      updatedAt: record.updatedAt.toISOString(),
    });
  } catch (e) {
    console.error("Failed to parse WorkspaceSession", e);
    return null;
  }
}

export async function getLatestWorkspaceSession(): Promise<WorkspaceSession | null> {
  const record = await prisma.workspaceSession.findFirst({
    orderBy: { updatedAt: 'desc' },
  });
  
  if (!record) return null;
  
  try {
    return WorkspaceSessionSchema.parse({
      ...record,
      createdAt: record.createdAt.toISOString(),
      updatedAt: record.updatedAt.toISOString(),
    });
  } catch (e) {
    console.error("Failed to parse WorkspaceSession", e);
    return null;
  }
}
