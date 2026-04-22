import { z } from "zod";
import { LearnModuleSchema } from "../schemas/learn.schema";

export type LearnModule = z.infer<typeof LearnModuleSchema>;
