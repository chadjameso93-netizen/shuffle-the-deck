import { z } from "zod";
import { SharedAnalysisSchema } from "../schemas/analysis.schema";

export type SharedAnalysis = z.infer<typeof SharedAnalysisSchema>;
