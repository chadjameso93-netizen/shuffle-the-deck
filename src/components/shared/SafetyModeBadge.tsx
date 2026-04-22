import { SafetyMode } from "@/lib/canonical/enums/safety";

export function SafetyModeBadge({ mode }: { mode: SafetyMode }) {
  const colors = {
    [SafetyMode.GROUNDING]: { bg: "#e0f2f1", color: "#00695c" }, // teal
    [SafetyMode.THROTTLED]: { bg: "#fff3e0", color: "#e65100" }, // orange
    [SafetyMode.FULL]: { bg: "#eceff1", color: "#455a64" },      // blue-grey
  };
  
  const label = {
    [SafetyMode.GROUNDING]: "Grounding Mode",
    [SafetyMode.THROTTLED]: "Throttled Mode",
    [SafetyMode.FULL]: "Standard Mode",
  };

  return (
    <div style={{
      display: "inline-block",
      padding: "0.25rem 0.75rem",
      borderRadius: "999px",
      fontSize: "0.8rem",
      fontWeight: "bold",
      background: colors[mode].bg,
      color: colors[mode].color,
      marginBottom: "1rem"
    }}>
      {label[mode]}
    </div>
  );
}
