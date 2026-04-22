import { prisma } from "./prisma";
import { LearnModule } from "../../canonical/types/learn";
import { LearnModuleSchema } from "../../canonical/schemas/learn.schema";

export async function saveLearnModule(module: LearnModule, analysisId: string): Promise<LearnModule> {
  // Validate before write
  const validated = LearnModuleSchema.parse(module);
  
  await prisma.learnModuleRecord.upsert({
    where: { id: validated.id },
    create: {
      id: validated.id,
      analysisId,
      payload: JSON.stringify(validated),
    },
    update: {
      payload: JSON.stringify(validated),
    },
  });
  
  return validated;
}

export async function getLearnModuleById(id: string): Promise<LearnModule | null> {
  const record = await prisma.learnModuleRecord.findUnique({
    where: { id },
  });
  
  if (!record) return null;
  
  // Validate after read
  try {
    const parsedJson = JSON.parse(record.payload);
    return LearnModuleSchema.parse(parsedJson);
  } catch (e) {
    console.error("Failed to parse canonical LearnModule from DB payload", e);
    return null;
  }
}
