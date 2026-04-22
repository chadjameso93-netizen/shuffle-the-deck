import { z } from "zod";
import { CanvasSceneSchema, CanvasSceneCardSchema, CanvasSceneConnectionSchema } from "../schemas/canvas.schema";

export type CanvasSceneCard = z.infer<typeof CanvasSceneCardSchema>;
export type CanvasSceneConnection = z.infer<typeof CanvasSceneConnectionSchema>;
export type CanvasScene = z.infer<typeof CanvasSceneSchema>;
