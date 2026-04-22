export type ProvenanceStageOutput = {
  bucket: "verified" | "partial" | "soft";
  notes: string[];
};

export function runProvenanceStage(confidence: "high" | "medium" | "low"): ProvenanceStageOutput {
  if (confidence === "high") {
    return { bucket: "verified", notes: ["Strong structural alignment found."] };
  }
  if (confidence === "medium") {
    return { bucket: "partial", notes: ["Some relational elements are inferred."] };
  }
  return { bucket: "soft", notes: ["Limited context provided. Output is highly generalized."] };
}
