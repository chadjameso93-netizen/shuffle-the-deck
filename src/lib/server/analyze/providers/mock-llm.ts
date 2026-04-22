// Mock Provider since real API keys and npm install aren't available yet
export async function mockLlmInference(prompt: string, stage: string): Promise<any> {
  const isStressed = prompt.toLowerCase().includes("overwhelm") || prompt.toLowerCase().includes("crisis");

  switch (stage) {
    case "safety":
      return { mode: isStressed ? "grounding" : "full", reasons: ["Simulated safety analysis"] };
    case "structure":
      return { relationalShape: "Dyadic Conflict", pressurePoints: ["time", "expectations"], actorHints: ["Self", "Other"] };
    case "pattern":
      return { 
        activeLoopLabel: "The Anxious Over-explain", 
        userCardFamily: "boundaries", 
        userExpressionState: "defended",
        otherCardFamily: "presence",
        otherExpressionState: "adaptive",
        leveragePoint: "Pause before clarifying."
      };
    case "recommendation":
      return { posture: "Neutral observation", cleanMove: "Acknowledge without defending", openingLine: "I hear what you are saying.", whatNotToDo: "Do not explain your reasoning yet." };
    default:
      return {};
  }
}
