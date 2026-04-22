import { prisma } from "./prisma";
import { SharedAnalysis } from "../../canonical/types/analysis";
import { SharedAnalysisSchema } from "../../canonical/schemas/analysis.schema";

export async function saveSharedAnalysis(analysis: SharedAnalysis): Promise<SharedAnalysis> {
  // Validate before write
  const validated = SharedAnalysisSchema.parse(analysis);
  
  await prisma.sharedAnalysisRecord.upsert({
    where: { id: validated.id },
    create: {
      id: validated.id,
      payload: JSON.stringify(validated),
      version: "1.0",
    },
    update: {
      payload: JSON.stringify(validated),
    },
  });
  
  return validated;
}

export async function getSharedAnalysisById(id: string): Promise<SharedAnalysis | null> {
  const record = await prisma.sharedAnalysisRecord.findUnique({
    where: { id },
  });
  
  if (!record) return null;
  
  // Validate after read
  try {
    const parsedJson = JSON.parse(record.payload);
    return SharedAnalysisSchema.parse(parsedJson);
  } catch (e) {
    console.error("Failed to parse canonical SharedAnalysis from DB payload", e);
    return null;
  }
}
