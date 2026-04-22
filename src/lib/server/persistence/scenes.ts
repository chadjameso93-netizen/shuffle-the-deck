import { prisma } from "./prisma";
import { CanvasScene } from "../../canonical/types/canvas";
import { CanvasSceneSchema } from "../../canonical/schemas/canvas.schema";

export async function saveCanvasScene(scene: CanvasScene, analysisId: string): Promise<CanvasScene> {
  // Validate before write
  const validated = CanvasSceneSchema.parse(scene);
  
  await prisma.canvasSceneRecord.upsert({
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

export async function getCanvasSceneById(id: string): Promise<CanvasScene | null> {
  const record = await prisma.canvasSceneRecord.findUnique({
    where: { id },
  });
  
  if (!record) return null;
  
  // Validate after read
  try {
    const parsedJson = JSON.parse(record.payload);
    return CanvasSceneSchema.parse(parsedJson);
  } catch (e) {
    console.error("Failed to parse canonical CanvasScene from DB payload", e);
    return null;
  }
}
